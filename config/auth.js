module.exports = {

    ensureAuthenticated: function(req, res, next) {
  
      if (req.isAuthenticated()) {
  
        return next();
  
      }
  
      req.flash('error_msg', 'Bitte loggen Sie sich ein.');
  
      res.redirect('/users/login');
  
    }
  
  };