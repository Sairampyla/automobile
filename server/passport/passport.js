
const express = require('express')
const User = require('../models/user.js')
var FacebookStrategy = require('passport-facebook').Strategy
var session = require('express-session')
const router = express.Router()
module.exports = function(app, passport) {
  
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret:'keyboard cat',resave:false,saveUninitialized:true,cookie:{secure:false}}));

    //serialize user
    passport.serializeUser(function(user, done){
        done(null,user.id);
    })
     //deserialize user
     passport.deserializeUser(function(id, done){
         User.findById(id,function(err, user){
             done(err,user)
         })
     })


    passport.use(new FacebookStrategy({
        clientID:'178592646719539',
        clientSecret: '653cc17d10ac957fcdf35ede36b925c1',
        callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
      },

      function(accessToken, refreshToken, profile, done) {
          console.log(profile)
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
        done(null,User)
      }
    ));

    
    app.get('/auth/facebook',
  passport.authenticate('facebook',{scope:'email'},function(req, res){}));


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  return passport
}