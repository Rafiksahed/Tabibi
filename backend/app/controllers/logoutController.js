// logoutController.js
module.exports = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }
      res.status(200).json({ success: true, message: 'Logout successful' });
    });
  };
  