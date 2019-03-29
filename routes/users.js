const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const passport = require("passport");

// Load User model

const User = require("../models/User");
var Sold = require("../models/Sold");
var Cancel = require("../models/Cancel");
var InProgress = require("../models/InProgress");
var Proposal = require("../models/Proposals");

// Login Page

router.get("/login", (req, res) => res.render("login"));

// Register Page

router.get("/register", (req, res) => res.render("register"));

// Register

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser

              .save()

              .then(user => {
                req.flash(
                  "success_msg",

                  "You are now registered and can log in"
                );

                res.redirect("/users/login");
              })

              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Logout

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

router.post('/proposal', function (req, res) {

  

  // response = {
  //   Vorname: req.body.vName,
  //   Nachname: req.body.nName,
  //   Email: req.body.email,
  //   ProductName: req.body.Produkt
  // };
  // var newProposal = Proposal(response);
  // newProposal.save(function (err) {
  //   if (err) return handleError(err);
  //   console.log("saved");
  //   // saved!
  // });
  // console.log(req.body);
  // res.redirect("/");
});
router.post('/change2inprogress', function(req, res){
   Proposal.findById( req.body.id).then( result =>{

    let swap = new InProgress({
      Name: result.Name,
      Vorname: result.Vorname,
      Email: result.Email,
       ProductName: result.ProductName
    })
    
    

     result.remove();
     swap.save();
     Sold = require("../models/Sold");
     Cancel = require("../models/Cancel");
     InProgress = require("../models/InProgress");
     Proposal = require("../models/Proposals");
     // swap is now in a better place
     res.redirect("/dashboard");
   });

});
router.post('/change2sold', function(req, res){
  InProgress.findById( req.body.id).then( result =>{

    let swap = new Sold({
      Name: result.Name,
      Vorname: result.Vorname,
      Email: result.Email,
       ProductName: result.ProductName
    })
    
    

     result.remove();
     swap.save();
     Sold = require("../models/Sold");
     Cancel = require("../models/Cancel");
     InProgress = require("../models/InProgress");
     Proposal = require("../models/Proposals");
     // swap is now in a better place
     res.redirect("/dashboard");
   });
});
router.post('/change2cancel', function(req, res){
  if(req.body.origin == "salesproposals"){
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
    Proposal.findById( req.body.id).then( result =>{

      let swap = new Cancel({
        Name: result.Name,
        Vorname: result.Vorname,
        Email: result.Email,
         ProductName: result.ProductName
      })
      
      
  
       result.remove();
       swap.save();
       Sold = require("../models/Sold");
       Cancel = require("../models/Cancel");
       InProgress = require("../models/InProgress");
       Proposal = require("../models/Proposals");
        res.redirect("/dashboard");
       // swap is now in a better place
  
     });
  }else{
    console.log("________________________________________________");
    InProgress.findById( req.body.id).then( result =>{

      let swap = new Cancel({
        Name: result.Name,
        Vorname: result.Vorname,
        Email: result.Email,
         ProductName: result.ProductName
      })
      
      
  
       result.remove();
       swap.save();
        Sold = require("../models/Sold");
        Cancel = require("../models/Cancel");
        InProgress = require("../models/InProgress");
        Proposal = require("../models/Proposals");
        

       // swap is now in a better place
  
     });
  }
});

module.exports = router;
