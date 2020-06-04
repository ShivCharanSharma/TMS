const express = require('express');
const router = express.Router();
const path =require("path");
const  Package  = require("../models/Package");
const multer = require('multer');

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads/')
	    console.log('../uploads');
    },
    filename: (req, file, cb) => {
	    console.log(file.originalname);
        cb(null, file.originalname)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             Product
//=================================

router.post("/uploadImage", (req, res) => {
console.log("in upload");
    upload(req, res, err => {
	    console.log(req.body);
        if (err) {
		console.log(err);
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});


router.post("/uploadPackage",  (req, res) => {

    //save all the data we got from the client into the DB 
    const package = new Package(req.body)

    package.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
});


router.post("/getPackages", (req, res) => {
    console.log("in get");
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};

	Package.find()
        .populate("writer")
        .exec((err, packages) => {
//:w
//		console.log(packages);
            if (err) {
//		    console.log(err);
		    return res.status(400).json({ success: false, err })
	    }
		    res.status(200).json({ success: true, packages, postSize: packages.length })
        })
//}

});


//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array 
router.get("/packages_by_id", (req, res) => {

let type = req.query.type
let packageIds = req.query.id
if (type === "array") {
    let ids = req.query.id.split(',');
    packageIds = [];
    packageIds = ids.map(item => {
        return item
    })
}



//we need to find the product information that belong to product Id 
Package.find({ '_id': { $in: packageIds } })
    .populate('writer')
    .exec((err, package) => {
	    if(err) console.log(err);
        if (err) return res.status(400).send(err)
        return res.status(200).send(package)
    })
});



module.exports = router;
