const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
module.exports = (app) => {

  // Sign Up
  app.post('/api/account/signup', (req, res, next) => {
    const {body} = req;
    const {
      firstName,
      lastName,
      password
    } = body;
    let {
      email
    } = body;

    // blank field validation
    if (!firstName) {
      return res.send({
        success: false,
        message: 'First Name cannot be empty!'
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: 'Email cannot be empty!'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Password cannot be empty!'
      });
    }

    email = email.toLowerCase();

    // double email validation
    User.find({
      email: email
    }, (err, prevUser) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Server error'
        });
      } else if (prevUser.length > 0) {
        return res.send({
          success: false,
          message: 'Account already exist!'
        });
      }

      // correct user signup
      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Sign up success.'
        });
      });
    });
  });

  // Sign In
  app.post('/api/account/signin', (req, res, next) => {
    const {body} = req;
    const {
      firstName,
      lastName,
      password
    } = body;
    let {
      email
    } = body;

    // blank field validation
    if (!email) {
      return res.send({
        success: false,
        message: 'Email cannot be empty!'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Password cannot be empty!'
      });
    }

    email = email.toLowerCase();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server error"
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Sign in failed!"
        });
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Invalid password!"
        });
      }

      // correct user signin
      const newUserSession = new UserSession();
      newUserSession.userId = user._id;
      newUserSession.save((err, doc) => {
       if (err) {
         return res.send({
           success: false,
           message: "Server error"
         });
       }
       return res.send({
         success: true,
         message: "Sign in success.",
         token: doc._id
       });
      });
    });
  });

  // Verification Session
  app.get('/api/account/verify', (req, res, next) => {
    const {query} = req;
    const {token} = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Server error'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Wrong token'
        });
      } else {
        return res.send({
          success: true,
          message: 'Right token'
        });
      }
    });
  });

  // Sign Out
  app.get('/api/account/signout', (req, res, next) => {
    const {query} = req;
    const {token} = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted: true
      }
    }, null, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Server error'
        });
      }
      return res.send({
        success: true,
        message: 'User signed out.'
      });
    });
  });
};
