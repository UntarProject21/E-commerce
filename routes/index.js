const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');

var session = require('express-session');
const product = require("../models/product");
var User = require('../models/user');
var Order = require('../models/order');
const e = require("express");

router.use(bodyParser.json());

router.get('/', async function(req, res, next) {
  const data = await product.find();
	res.render("pages/index", {data});
  //res.render('pages/index');
});



router.get('/Aboutus', function(req, res) {
    res.render('pages/Aboutus');
  });

router.get('/cart', function(req, res) {
    res.render('pages/cart');
  });

router.get('/contactus', function(req, res) {
    res.render('pages/contactus');
  });

router.get('/FAQ', function(req, res) {
    res.render('pages/FAQ');
  }); 

router.get('/ForgetPass-verification', function(req, res) {
    res.render('pages/ForgetPass-verification');
  });

router.get('/ForgetPass', function(req, res) {
    res.render('pages/ForgetPass');
  });
 
router.get(['/userInfo', '/userInfo/:_id'], async function(req, res) {
  //const _id = req.params;
  console.log(req.session.userId);
  const data = await User.findById(req.session.userId);
  console.log(data);
  res.render('pages/userInfo',{data});
});

router.post('/userInfo', function(req, res) {
  console.log("logged out")
  req.session.destroy();
  res.redirect('/');
});

router.get('/login', function(req, res) {
  if (req.session.userId != null) {
    res.redirect('/userInfo');
  } else {
    res.render('pages/login');
  }
});

router.post('/login', async function (req, res, next) {
  console.log(req.body);
  User.findOne({email:req.body.email},function(err,data){
    if(data){
      
      if(data.password==req.body.password){
        console.log("Done Login");
        req.session.userId = data._id;
        console.log("login session : " + req.session.userId);
        res.send({"Success":"Success!"});
        
      }else{
        res.send({"Success":"Wrong password!"});
      }
    }else{
      res.send({"Success":"This Email Is not regestered!"});
    }
  });
});

//get all products
router.get('/product', async function(req, res) {
    const data = await product.find();
    console.log({data}); 
    res.render("pages/product", {data});
  });

//get A product
router.get(['/productDetails', '/productDetails/:_id'], async function(req, res) {
    const _id = req.params;
    //const data = await product.find();
    const data = await product.findById(_id);
    console.log({data});
    res.render('pages/productDetails', {data}); 
  });

router.get('/register-verification-completed', function(req, res) {
    res.render('pages/register-verification-completed');
  });

router.get('/register-verification-error', function(req, res) {
    res.render('pages/register-verification-error');
  });
  
router.get('/register-verification-sent', function(req, res) {
    res.render('pages/register-verification-sent');
  });

router.get('/register', function(req, res) {
    res.render('pages/register');
  });

router.post('/register', async function(req, res, next) {
  var personInfo = req.body;
  //console.log(personInfo);

  if(!personInfo.email || !personInfo.firstName || !personInfo.lastName || !personInfo.password || !personInfo.passwordConf){
    res.send();
    console.log("help");
  } else {
    if (personInfo.password == personInfo.passwordConf) {

      User.findOne({email:personInfo.email},function(err,data){
        if(!data){
          User.findOne({},function(err,data){
            var newPerson = new User({
              email:personInfo.email,
              firstName: personInfo.firstName,
              lastName: personInfo.lastName,
              password: personInfo.password,
              passwordConf: personInfo.passwordConf
            });
            //console.log("DATA INPUT : " + newPerson);
            console.log("USER REGISTERED TO DATABASE : " + newPerson);
            newPerson.save();

            newPerson.save(function(err, Person){
              if(err)
                console.log(err);
              else
                console.log('Success');
            });

          }).sort({_id: -1}).limit(1);
          res.send({"Success":"You are registered,You can login now."});
        }else{
         res.send({"Success":"e-mail is already used. Please use another e-mail."});
        }

     });
    }else{
     res.send({"Success":"password is not matched"});
    }
  }
});

router.get('/checkout', async function(req, res) {
  const data = await product.find();
  res.render("pages/checkout", {data});
});

router.post('/cart', async function(req, res, next) {
  var personInfo = req.body;
  console.log(personInfo);

  if(!personInfo.email){
    res.send();
    console.log("help");
  } else {
      User.findOne({},function(err,data){
        if(data){
          User.findOne({},function(err,data){
            var newOrder = new Order({
              firstName: personInfo.firstName,
              lastName: personInfo.lastName,
              email:personInfo.email,
              address: personInfo.address,
              regency: personInfo.regency,
              province: personInfo.province,
              zipcode: personInfo.zipcode,
              cardName: personInfo.cardName,
              creditNumber: personInfo.creditNumber,
              expMonth: personInfo.expMonth,
              expYear: personInfo.expYear,
              cvv: personInfo.cvv
            });
            //console.log("DATA INPUT : " + newPerson);
            console.log("ORDER REGISTERED TO DATABASE : " + newOrder);
            newOrder.save();

            newOrder.save(function(err, Person){
              if(err)
                console.log(err);
              else
                console.log('Success');
            });

          }).sort({_id: -1}).limit(1);
          res.send({"Success":"Order Received"});
        }else{
         res.send({"Success":"Order Failed"});
        }
     });  
  }
});

router.get('/ResetPass-verification', function(req, res) {
    res.render('pages/ResetPass-verification');
  });
 
router.get('/ResetPass', function(req, res) {
    res.render('pages/ResetPass');
  });

router.get('/shipping', function(req, res) {
    res.render('pages/shipping');
  });

router.get('/T&C', function(req, res) {
    res.render('pages/T&C');
  });
 
router.get('/wishlist', function(req, res) {
    res.render('pages/wishlist');
  });
  router.get('/transaction', function(req, res) {
    res.render('pages/transaction');
  });


  
  
  
  );

module.exports = router;