const express = require('express');
const router = express.Router();
const http = require('http');
const https = require('https');


const {auth}=require('../middleware/auth');
const PaytmConfig =require('../config/key').PaytmConfig
const axois = require('axios');
const Package = require("../models/Package");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const async = require('async');

const checksum_lib =  require('./checksum/checksum.js');
const port =5000;

router.get("/",(req,res)=>{
	
	res.redirect(url.format({
		host:"http://localhost:5000",
		pathname:"/api/payment",
		query:{
			"userData":"Userid"		
		}
	}));
})
const getTotalAmount= async (user)=>{
	let cartItems=[];
		
	  let total2 =0;
	user.cart.forEach(item => {
		cartItems.push(item.id);	
	})

	const cartDetail =await Package.find({ '_id': { $in: cartItems} })
    	.populate('writer');

	return cartDetail;
    	
	     
}

const getUser = async (id)=>{
			
					
					const user= await User.findById({_id:id});
					return user;	
		
		}
router.get("/payment", auth, (req,res)=>{
	console.log("in payment");
	console.log(req.hostname)	
	const hostname=process.env.NODE_ENV === "production"?req.hostname:"localhost:"+port;	
	let cartItems=[];
	const user =req.user;
	
	user.cart.forEach(item => {
		cartItems.push(item.id);	
	})

	 Package.find({ '_id': { $in: cartItems} })
    	.populate('writer')
    	.exec((err,package) => {
    	    if (err) return false;
	 	let total=0;
	    user.cart.forEach(cartItem => {
                package.forEach((productDetail, i) => {
			
                    if (cartItem.id == productDetail._id) {
                      total += parseFloat(productDetail.price).toFixed(2) * parseFloat(cartItem.quantity).toFixed(2);
			
                    }
                })
            })
	
            
	var params = {};
			params['MID'] 					= PaytmConfig.mid;
			params['WEBSITE']				= PaytmConfig.website;
			params['CHANNEL_ID']			= 'WEB';
			params['INDUSTRY_TYPE_ID']	= 'Retail';
			params['ORDER_ID']			= 'ODR.'+user._id+'.'+Date.now();
			params['CUST_ID'] 			= ""+user._id;
			params['TXN_AMOUNT']			= parseFloat(total).toFixed(2);
			params['CALLBACK_URL']		= 'http://'+hostname+'/api/payment/callback';
			params['EMAIL']				= user.email;
			params['MOBILE_NO']			= '7777777777';

			checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

				var txn_url = PaytmConfig.txn_url; // for staging
//				// var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
				
				var form_fields = "";
				for(var x in params){
					form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
				}
				form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields+'</form><script type="text/javascript">document.f1.submit();</script></body></html>');
			
			
				
			});
	 })
	


})
router.post("/callback",(req,res)=>{
		
		

				var post_data= req.body;

				// received params in callback
				//console.log('Callback Response: ', post_data, "\n");
				
				

				// verify the checksum
				var checksumhash = post_data.CHECKSUMHASH;
				// delete post_data.CHECKSUMHASH;
				var result = checksum_lib.verifychecksum(post_data, PaytmConfig.key, checksumhash);
				//console.log("Checksum Result => ", result, "\n");
				



				// Send Server-to-Server request to verify Order Status
				var params = {"MID": PaytmConfig.mid, "ORDERID": post_data.ORDERID};

				checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

					params.CHECKSUMHASH = checksum;
					post_data = 'JsonData='+JSON.stringify(params);

					var options = {
						hostname:PaytmConfig.hostname, //'securegw-stage.paytm.in', // for staging
						// hostname: 'securegw.paytm.in', // for production
						port: 443,
						path: '/merchant-status/getTxnStatus',
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Length': post_data.length
						}
					};


					// Set up the request
					var response = "";
					var post_req = https.request(options, function(post_res) {
						post_res.on('data', function (chunk) {
							response += chunk;
						});

						post_res.on('end', function(){
							//console.log('S2S Response: ', response, "\n");

							var payment_result = JSON.parse(response);

// update database
				
					var cartDetail=[];
					
					const user=getUser(payment_result.ORDERID.split(".")[1]);
					user.then((user)=>{					
					//console.log(user);
					
					const cartDetailQuery=getTotalAmount(user);
					cartDetailQuery.then((package) => {
    	   					
	 					 let total=0;
						
	    					 user.cart.forEach(cartItem => {
                					package.forEach((productDetail, i) => {
							var product=productDetail;
                    					if (cartItem.id == productDetail._id) {
							product.quantity = cartItem.quantity;
							
                      					total += parseFloat(productDetail.price).toFixed(2) * parseFloat(cartItem.quantity).toFixed(2);
							 		
							 cartDetail.push(product);

							}
                					})
            					})
						
						
//database


    let transactionData = {};
	let bookings =[];
    //1.Put brief Payment Information inside User Collection 
    cartDetail.forEach((item) => {
     
	 bookings.push({
	    bookedByUserId:user._id,
	    packageId: item._id,
            bookingDate: payment_result.TXNDATE,
            packageTitle: item.title,
            price: item.price,
            quantity: item.quantity,
            paymentId: payment_result.TXNID,
	    orderId: payment_result.ORDERID	  
        })
	
    })
	
    //2.Put Payment Information that come from Paytm into Payment Collection 
   


    transactionData = payment_result;
    transactionData.user = user._id;
    transactionData.product = bookings;


            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) console.log({ success: false, err });

                //3. Increase the amount of number for the sold information 

                //first We need to know how many product were sold in this transaction for 
                // each of products

                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                // first Item    quantity 2
                // second Item  quantity 3

                async.eachSeries(products, (item, callback) => {
                    Package.updateOne(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err)  console.log({ success: false, err })
                     
                })

            })
if(payment_result.RESPCODE == "01" && payment_result.STATUS == "TXN_SUCCESS"){
		if (total == payment_result.TXNAMOUNT){
		bookings.forEach(toBooking =>{
			toBooking.status="Booked";
			const booking = new Booking(toBooking);
			booking.save((err)=>{
			if(err) console.log(err);
			});
			
			 					
		})
		}
	}

 const UpdateUser=async (payment_result,user)=>{
	var updateUser={};
updateUser=await ((payment_result)=>{
var updateUser={};
	if(payment_result.RESPCODE == "01" && payment_result.STATUS == "TXN_SUCCESS"){
		if (total == payment_result.TXNAMOUNT){
		updateUser= {  $set: { cart: [],showPaymentStatus :1 } };
		}
	}else{
	
	 updateUser= { $set: { showPaymentStatus :2 } };
	}
	return updateUser;
})(payment_result);
if(updateUser){
    User.findOneAndUpdate(
        { _id: user._id },
         updateUser,
        { new: true },
        (err, user) => {
            if (err) console.log({ success: false, err });

        })
}
};
UpdateUser(payment_result,user);
const redirectHost=process.env.NODE_ENV === "production"?req.hostname:"localhost:3000";
	
res.redirect('http://'+redirectHost+'/user/cart');					



					 })//package
					
					})//user
				


							
							

							
						});
					});

					// post the data
					console.log(post_data);
					post_req.write(post_data);
					post_req.end();
					
				});
	        //});
})



module.exports= router;

