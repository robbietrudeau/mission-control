exports.index = function(req, res) {
  if (req.session.user) {
    res.render('index', {user: req.session.user, active: 'index'});
  } else {
    res.render('index');
  }
};