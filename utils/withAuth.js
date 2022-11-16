const withAuth = (req, res, next) => {
  console.log(req.session.loggedIn);
    // If the user is not logged in, redirect the user to the login page
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // If the user is logged in, execute the route function that will allow them to view the gallery
      // We call next() if the user is authenticated
      next();
    }
  };
  
  module.exports = withAuth;
  