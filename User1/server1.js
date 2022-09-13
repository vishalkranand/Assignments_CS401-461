const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(
  'mongodb+srv://newuser:Neeraj27@cluster0.mfuj1tc.mongodb.net/?retryWrites=true&w=majority',

  {
    useNewUrlParser: true,
  }
);

const customerSchema = new mongoose.Schema({
  // Customer_ID: String,
  customer_balance: Number,
  customer_email: String,
  customer_mobile: Number,
  first_name: String,
  last_name: String,
});

const Customer = mongoose.model('Customer', customerSchema);

// const dummyCustomer = new Customer({
//   Customer_ID: '1',
//   Customer_First_Name: 'Dummy',
//   Customer_Last_Name: 'Dummy',
//   Customer_Mobile: 0000000000,
//   Customer_Email: 'dummy@dummy.com',
// });

app.get('/', function (req, res) {
  // Customer.find({}, function (err, results) {
  //   if (results.length === 0) {
  //     Customer.insertMany(dummyCustomer, function (err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('Successfully added dummyCustomer in DataBase');
  //       }
  //     });
  //     res.render('create');
  //   } else {
  res.render('create');
  // }
  // });
});

app.post('/', function (req, res) {
  //redirect to different routes after post request from here rather than making new post requests app.post
  // const Customers_ID = req.body.Customer_ID;
  const Customers_first_name = req.body.first_name;
  const Customers_last_name = req.body.last_name;
  const Customers_Mobile = req.body.customer_mobile;
  const Customers_Email = req.body.customer_email;
  const Customer_Balance = req.body.customer_balance;

  const addedCustomer = new Customer({
    // Customer_ID: Customers_ID,
    first_name: Customers_first_name,
    last_name: Customers_last_name,
    customer_mobile: Customers_Mobile,
    customer_email: Customers_Email,
    customer_balance: Customer_Balance,
  });

  addedCustomer.save();
  res.redirect('/');
});

app.listen(3001, function () {
  console.log('Server started successfully at port:3001!');
});
