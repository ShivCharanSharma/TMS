module.exports = {
    mongoURI:process.env.MONGOURI,
    PaytmConfig : {
        mid: process.env.MID,
        key: process.env.KEY,
        website: process.env.WEBSITE,
	txn_url:"https://securegw.paytm.in/theia/processTransaction",
	hostname:'securegw.paytm.in',
	},
    secretKey:process.env.SECRETKEY,//for cookies and jwt
	cookieName:'TravelAppAdmin',//for admin panel

}
