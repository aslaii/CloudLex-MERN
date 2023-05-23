//import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

//app
const app = express();
//db
dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
    UseNewUrlParser: true,
    useUnifiedTopology: true

}).then(()=> console.log("DB Connected")).catch(err => console.log("DB Connection Error",err));

//middleware
app.use(morgan("dev"));
app.use(cors({ origin:true, credentials:true}));
//routes
const testRoutes = require('./routes/test');
app.use("/",testRoutes);


// port
const port = process.env.port || 8080;

//listener
const server = app.listen(port, ()=>
console.log("Server is Running!"));

//2i5JhuYW74a8PfmE