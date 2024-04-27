// registrationController.js
const connection = require('../db');

module.exports = (req, res) => {
  const { username, number, email, password } = req.body;

  const userSql = "INSERT INTO users (username, password_hash, email, phone_number) VALUES (?, ?, ?, ?)";
  const userValues = [username, password, email, number];
  
  connection.query(userSql, userValues, (err, userResults) => {
      if (err) {
          console.error('Error executing user SQL query:', err);
          res.status(500).json({ success: false, message: 'Error inserting user data' });
          return;
      }

      const insertedId = userResults.insertId;

      const patientSql = "INSERT INTO patients (user_id, username) VALUES (?, ?)";
      const patientValues = [insertedId, username];
      
      connection.query(patientSql, patientValues, (err, patientResults) => {
          if (err) {
              console.error('Error executing patient SQL query:', err);
              res.status(500).json({ success: false, message: 'Error inserting patient data' });
              return;
          }

          res.status(200).json({ success: true, message: 'Patient registration successful' });
      });
  });
};
