const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const paymentSchema = mongoose.Schema({
    user: {
	    type: Schema.Types.ObjectId,
	            ref: 'User'
	    
    },

    data: {
        type: Array,
	 default: []
    },
	MID:String,
	TXNID:String,
	ORDERID:String,
	BANKTXNID:String,
	TXNAMOUNT:String,
	STATUS:String,
	RESPCODE:String,
	RESPMSG:String,
	TXNDATE:String,
	GATEWAYNAME:String,
	BANKNAME:String,
	PAYMENTMODE:String,
	TXNTYPE:String,
	REFUNDAMT:String,
    product: {
        type: [{

	 bookedByUserId: {
        	type: Schema.Types.ObjectId,
        	ref: 'User'
    	},
	packageId: {
        	type: Schema.Types.ObjectId,
        	ref : 'Package'
    	},
    	packageTitle:{
    		type:String,
    	},
    	price:{
    		type:Number,
    	},
    	quantity:{
    		type:Number,	
    	},
	paymentId:{
		type:String,
	},
	orderId:{
		type:String,
	},
   
    	bookingDate: {
        type: Date,
    	},
   
	
	
	}],
        default: []
    }


}, { timestamps: true })


const Payment = mongoose.model('Payment', paymentSchema);

module.exports =  Payment 

