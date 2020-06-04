const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Status = mongoose.Schema({ 
	id:{
		type:Number,
		default:0,
	},
	name:{
		type:String,
		default:"Booked"
	}

},{_id:false})
const bookingSchema = mongoose.Schema({
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
    comments:{
        type:String,
    },

    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type:String,
        //min:1,
	//max:5,
	default: "Booked"   //1 ="Booked",2="Cancellation",3="Canellation Declined",4="Order Complete",5="Cancelled",
    },
	refId:{
		type:String,

	},
       
}, { timestamps: true })


// bookingSchema.index({
//     title:'text',
//     description: 'text',
// }, {
//     weights: {
//         name: 5,
//         description: 1,
//     }
// })
const Booking = mongoose.model('Booking', bookingSchema);

module.exports =  Booking 
