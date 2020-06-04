const https = require('https');
const express = require('express');
const router = express.Router();
const axois = require('axios');
const Booking = require("../models/Booking");
const checksum_lib =  require('./checksum/checksum.js');
	
const {auth}=require('../middleware/auth');
const PaytmConfig =require('../config/key').PaytmConfig
//
//var PaytmConfig = {
//	mid: "zJFVyz79075745421409",
//	key: "d8lMysUh&nAAm1hJ",
//	website: "WEBSTAGING"
//}
router.post("/send",  (req,res)=>{
/* initialize an object */
var paytmParams = {};
console.log("inrefund");
console.log(req.body);
/* body parameters */
paytmParams.body = {

"mid" : PaytmConfig.mid,

/* This has fixed value for refund transaction */
"txnType" : "REFUND",

/* Enter your order id for which refund needs to be initiated */
"orderId" : req.body.orderId,

/* Enter transaction id received from Paytm for respective successful order */
"txnId" : req.body.txnId,
/* Enter numeric or alphanumeric unique refund id */
"refId" : "RFD."+req.body.userId+"."+Date.now(),

/* Enter amount that needs to be refunded, this must be numeric */
"refundAmount" : parseFloat(req.body.refundAmount).toFixed(2),
};

/**
* Generate checksum by parameters we have in body
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
*/
checksum_lib.genchecksumbystring(JSON.stringify(paytmParams.body), PaytmConfig.key, function(err, checksum){

/* head parameters */
paytmParams.head = {

/* This is used when you have two different merchant keys. In case you have only one please put - C11 */
"clientId" : "C11",

/* put generated checksum value here */
"signature" : checksum
};

/* prepare JSON string for request */
var post_data = JSON.stringify(paytmParams);

var options = {

/* for Staging */
hostname:PaytmConfig.hostname, //'securegw-stage.paytm.in',

/* for Production */
// hostname: 'securegw.paytm.in',

port: 443,
path: '/refund/apply',
method: 'POST',
headers: {
'Content-Type': 'application/json',
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
console.log('Response: ', response);
response=JSON.parse(response)
const resData={
	resultInfo:response.body.resultInfo,
	refIdByApp:response.body.refId,
	refIdByPaytm:response.body.refundId,
	refAmount:response.body.refundAmount,

}
return res.status(200).json({success:true,response,resData});
});
});

// post the data
post_req.write(post_data);
post_req.end();
});

})

router.post('/status',(req,res)=>{
console.log("in status");
if(!(req.body.orderId && req.body.refId)){
	return res.status(400).json({success:false ,err:"empty payload"})
}
/* initialize an object */
var paytmParams = {};

/* body parameters */
paytmParams.body = {

/* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
"mid" : PaytmConfig.mid,

/* Enter your order id for which refund was initiated */
"orderId" : req.body.orderId,

/* Enter refund id which was used for initiating refund */
"refId" : req.body.refId,
};

/**
* Generate checksum by parameters we have in body
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
*/
checksum_lib.genchecksumbystring(JSON.stringify(paytmParams.body), PaytmConfig.key, function(err, checksum){

/* head parameters */
paytmParams.head = {

/* This is used when you have two different merchant keys. In case you have only one please put - C11 */
"clientId" : "C11",

/* put generated checksum value here */
"signature" : checksum
};

/* prepare JSON string for request */
var post_data = JSON.stringify(paytmParams);

var options = {

/* for Staging */
hostname: PaytmConfig.hostname,//'securegw-stage.paytm.in',

/* for Production */
// hostname: 'securegw.paytm.in',

port: 443,
path: '/v2/refund/status',
method: 'POST',
headers: {
'Content-Type': 'application/json',
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
console.log('Response: ', response);
 response= JSON.parse(response);
//var result = checksum_lib.verifychecksum(response.body, PaytmConfig.key, response.head.signature);
//console.log(result);
const resData={
	resultInfo:response.body["resultInfo"],
	acceptRefundStatus:response.body.acceptRefundStatus,
	refundDetailInfoList:response.body.refundDetailInfoList,
	refIdByPaytm:response.body.refundId,
	refAmount:response.body.refundAmount,

}
return res.status(200).json({success:true,resData});
});
post_res.on('error', function(err) {
    // Handle error
	return res.status(400).json({success:false ,err:"System error"})
});


});
// post the data
post_req.write(post_data);
post_req.end();
});

})
module.exports= router;
