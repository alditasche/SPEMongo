const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');



// Load User model

const User = require('../models/User');
const Proposal = require('../models/Proposals');
const InProgress = require('../models/InProgress');
const Cancel = require('../models/Cancel');
const Sold = require('../models/Sold')
async function getMongoData(email) {
    try {
      user = await User.findOne({email: email})
      proposal = await Proposal.find({});
      inprogress = await InProgress.find({});
      cancel = await Cancel.find({});
      sold = await Sold.find({});
      return mongoData = {
        user: user,
        proposal: proposal,
        inprogress: inprogress,
        cancel: cancel,
        sold: sold
      }
    }
    catch (err) {
      console.log(err);
    }
  }
module.exports = function(passport) {

  passport.use(

    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

      // Match user

      getMongoData(email).then(mongoData => {

        if (!mongoData.user) {

          return done(null, false, { message: 'Diese Mail wurde nicht regristriert' });

        }



        // Match password

        bcrypt.compare(password, mongoData.user.password, (err, isMatch) => {

          if (err) throw err;

          if (isMatch) {
                console.log("hi"+JSON.stringify(mongoData));
                return done(null, mongoData);
          } else {
            return done(null, false, { message: 'Sie haben ein falsches Passwort eingegeben' });
          }

        });

      });

    })

  );



  passport.serializeUser(function(mongoData, done) {

    done(null, mongoData.user.id);

  });



  passport.deserializeUser(function(id, done) {

    User.findById(id, function(err, user) {

      done(err, mongoData);

    });

  });

};