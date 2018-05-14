const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,

      GitHubStrategy = require('passport-github2').Strategy,
      TwitterStrategy = require('passport-twitter').Strategy,
      shortid = require('shortid');
      generatePassword = require('password-generator');


      bcrypt = require('bcrypt');



passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb){
  User.findOne({id}, function(err, user) {
    cb(err, users);
  });
});


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
     
      bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              message: 'Invalid Password'
            });
          var returnUser = {
            username: user.username,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        });
    });
  }
));





// oAuth beginning here 


passport.use(new TwitterStrategy({
    consumerKey: 'YQKoiGgFsFcQRIKXrLqMW1RG0',
    consumerSecret: 'CjaYASh5raoV9RuGQmhh0VFp3o80YMyJn6OutB9HNZtasfm0FV',
    callbackURL: "http://localhost:1337/auth/twitter/callback"
  },

function(token, tokenSecret, profile, done) {
 
  User.findOne({ uid: profile.id, provider: profile.provider }, function(err, user) {
  
    if (user) {
      return done(null, user);
    } else {

      var data = {
        provider: profile.provider,
        uid: profile.id,
        username: profile.username
      };

      var shortid = require('shortid'),
          generatePassword = require('password-generator');

      //Let's generate a fake email and a fake password to match the User model attributes    
      var fakeEmail = 'fake_' + new Date().getTime() + '_' + shortid.generate() + '@fake.com';
          data.email = fakeEmail;

      var password = generatePassword(12, false); 
          data.password = password;         

      User.create(data, function(err, user) {
        if (err) { return done(err); }
        return done(null, user);
      });
    }
  });
}
));




/*
passport.use(new GitHubStrategy({
  clientID: '89d03b1f560e93d911be',
  clientSecret: 'b4ea5e9aad5e36d6bbb9f1e3a851575bb0fc2eaf',
  callbackURL: "http://localhost:1337/auth/github/callback"
},
function(token, tokenSecret, profile, done) {
  
  User.findOne({ uid: profile.id, provider: profile.provider }, function(err, user) {
  
    if (user) {
      return done(null, user);
    } else {

      var data = {
        provider: profile.provider,
        uid: profile.id,
        username: profile.username
      };

      var shortid = require('shortid'),
          generatePassword = require('password-generator');

      //Let's generate a fake email and a fake password to match the User model attributes    
      var fakeEmail = 'fake_' + new Date().getTime() + '_' + shortid.generate() + '@fake.com';
          data.email = fakeEmail;

      var password = generatePassword(12, false); 
          data.password = password;         

      User.create(data, function(err, user) {
        if (err) { return done(err); }
        return done(null, user, {
          message: 'Logged In Successfully'
        });
      });
    }
  });
}
));

*/