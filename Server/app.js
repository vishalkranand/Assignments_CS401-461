const express=require('express');
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const Double = require("@mongoosejs/double");
const cors = require("cors")
const router = new express.Router();
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);
app.use(express.json());
app.use(express.static('public'));

mongoose.connect("mongodb+srv://vkanand:j4eQrQ-QsrpYm7Q@cluster0.mya2bqp.mongodb.net/?retryWrites=true&w=majority").then(()=>
{
console.log("Connection successful");
}).catch((err)=>console.log("no connection"));

let CustomerSchema=new mongoose.Schema({
    first_name:String,
    last_name: String,
    customer_email:String,
    customer_mobile : Number,
    customer_balance : Number
});

let Customerdt = new mongoose.model('customer',CustomerSchema);

router.get("/customers", async (req, res) => {
    try {
        const customers = await Customerdt.find({});
        console.log(customers);
        res.send(customers);
    } catch (e) {
        res.status(500).send();
    }
});
app.listen(5000,()=>console.log("Server started on port 5000"));