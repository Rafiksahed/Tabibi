// doctorRegistrationController.js
const connection = require('../db');

module.exports = (req, res) => {
  const { username, number, email, password, spec, ville, adresse } = req.body;

  const userSql = "INSERT INTO users (username, password_hash, email, phone_number) VALUES (?, ?, ?, ?)";
  const userValues = [username, password, email, number];
  
  connection.query(userSql, userValues, (err, userResults) => {
      if (err) {
          console.error('Error executing user SQL query:', err);
          res.status(500).json({ success: false, message: 'Error inserting user data' });
          return;
      }

      const insertedId = userResults.insertId;
      const status = 'attente';

      const medecinSql = "INSERT INTO doctors (user_id, username, speciality, status, ville, adresse) VALUES (?, ?, ?, ?, ?, ?)";
      const medecinValues = [insertedId, username, spec, status, ville, adresse];
      
      connection.query(medecinSql, medecinValues, (err, medecinResults) => {
          if (err) {
              console.error('Error executing doctor SQL query:', err);
              res.status(500).json({ success: false, message: 'Error inserting doctor data' });
              return;
          }

          req.session.user = username;

          res.status(200).json({ success: true, message: 'Doctor registration successful', user: username });
          console.log(username)
      });
  });
};
