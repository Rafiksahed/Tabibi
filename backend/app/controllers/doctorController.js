const connection = require('../db');

module.exports.getDoctorUserId = (req, res) => {
  if (req.session.user && req.session.user.user_id) {
    res.json({ user_id: req.session.user.user_id });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
