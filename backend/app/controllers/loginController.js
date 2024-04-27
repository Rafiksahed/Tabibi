// loginController.js
const connection = require('../db');

module.exports = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
  const values = [email, password];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      req.session.user = user;
      res.status(200).json({ success: true, message: 'Login successful', user: user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  });
};
