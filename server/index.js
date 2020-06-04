const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const compression = require('compression');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(compression({filter:shouldCompress}));
function shouldCompress(req,res){
 if (req.baseUrl == '/api/payment' || req.baseUrl == '/api/refund') {
    // don't compress responses with this request header
    return false
  }
 
  // fallback to standard filter function
  return compression.filter(req, res)


}



app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname))

app.use('/admin', require('./admin/admin'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));
app.use('/api/payment',require('./routes/payment.js'));
app.use('/api/booking',require('./routes/booking.js'));
app.use('/api/refund',require('./routes/refunds.js'));
//use this to show the image you have in node js server to client (react js)
app.use('/api/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	console.log("production");
  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});
