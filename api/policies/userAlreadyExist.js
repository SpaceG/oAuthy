// policies/userAlreadyExist.js
//TODO
module.exports = function userAlreadyExist (req, res, next) {
  var email = req.param('email');

  User
  .findOne( { email: email } )
  .exec( function (err, user) {

    // Unexpected error occurred-- skip to the app's default error (500) handler
    if (err) return next(err);

    if (user) return res.send({
      message: 'That email is taken already',
      user : user
    });

    // If we made it all the way down here, looks like everything's ok, so we'll let the user through
    next();
  });
};