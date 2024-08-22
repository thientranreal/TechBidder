function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // User is authenticated
    return next();
  } else {
    // User is not authenticated, redirect to page not found
    res.status(404).render("404");
  }
}

module.exports = ensureAuthenticated;
