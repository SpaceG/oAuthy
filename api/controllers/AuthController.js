const passport = require('passport');

module.exports = {



    login: function(req, res) {


       
    if (req.param('fakeinput') !== '') {
        return res.send({
            message: 'Are you sure you are a human?',
            user: false
        });
    }

    passport.authenticate('local', function(err, user, info){

      if((err) || (!user)) {
        return res.send({
          message: info.message,
          user
        });
      }
req.logIn(user, function(err) {
        if(err) res.send(err);
        return res.send({
          message: info.message,
          user
        });
      });
    })(req, res);
  },
logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },



// oAuth beginning here 

twitter: function(req, res){

    passport.authenticate('twitter')(req,res);

  },

  twitterCallback: function(req, res){
  	
		 passport.authenticate('twitter', { failureRedirect: '/login' }, function(err, user) {
      req.logIn(user, function(err) {
  

        res.redirect('/');
        return;
      });
    })(req, res);

  },

///github call back 
github: function(req, res){

  passport.authenticate('github')(req,res);

},
//github call back api - coming sonn 
githubCallback: function(req, res){    
  passport.authenticate('github', { failureRedirect: '/login' }, function(err, user) {
    req.logIn(user, function(err) {
  

      res.redirect('/');
      return;
    });
  })(req, res);

},

};