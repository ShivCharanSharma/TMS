const express = require('express');
const router = express.Router();
const  Booking  = require("../models/Booking");

const { auth } = require("../middleware/auth");
//=================================
//             Booking
//=================================

router.post("/getBookings", (req, res) => {
    console.log("in booking");


//    if (term) {
//        Package.find(findArgs)
//            .find({ $text: { $search: term } })
//            .populate("writer")
//            .sort([[sortBy, order]])
//            .skip(skip)
//            .limit(limit)
//            .exec((err, packages) => {
//                if (err) return res.status(400).json({ success: false, err })
//                res.status(200).json({ success: true, packages, postSize: packages.length })
//            })
//    } else {
        Booking.find()
        .exec((err, bookings) => {
//:w
//		console.log(packages);
            if (err) {
//		    console.log(err);
		    return res.status(400).json({ success: false, err })
	    }
		    res.status(200).json({ success: true, bookings, bookingsSize: bookings.length })
        })
//}

});

router.post('/requestbookingcancel',(req,res)=>{
	console.log(req.body)
	Booking.findOneAndUpdate(
		{_id:req.body.bookingId},
		{$set:{status:"cancellation"}},
		{new:true},
		(err,booking)=>{
		if(err) res.status(400).json({success:false,err});

		return res.status(200).json({success:true,booking});
		
		})


});
router.post('/setstatus',(req,res)=>{
	console.log(req.body)
	Booking.findOneAndUpdate(
		{_id:req.body.bookingId},
	//	{$set:{status:req.body.newStatus}},
		{$set:req.body.update},
		{new:true},
		(err,booking)=>{
		if(err) res.status(400).json({success:false,err});

		return res.status(200).json({success:true,booking});
		
		})

});
module.exports = router;
