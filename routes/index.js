const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');

const product = require("../models/product");
var User = require('../models/user');

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
 

router.get('/login', function(req, res) {
    res.render('pages/login');
  });

//get all products
router.get('/product', async function(req, res) {
    const data = await product.find();
    console.log({data}); 
    res.render("pages/product", {data});
  });

//get A product
router.get(['/productDetails', '/productDetails/:_id'], async function(req, res) {
    const _id = req.params  
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

router.post('/register', async function(req, res) {
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
            console.log("DATA INPUT : " + newPerson);
            console.log("USER REGISTERED TO DATABASE : " + User);
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


module.exports = router;