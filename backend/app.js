const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');



const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tabibi'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/info', (req, res) => {
  let sql = "SELECT * FROM doctors";
  const speciality = req.query.speciality;
  if (speciality) {
      sql += ` WHERE speciality = '${speciality}'`;
  }
  const username = req.query.username;
  if (username) {
    sql += ` WHERE username LIKE '%${username}%'`;
  }
  connection.query(sql, (err, rows, fields) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.json(rows);
      }
  });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Prepare SQL query
  const sql = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
  const values = [email, password];

  // Execute the query
  connection.query(sql, values, (err, results) => {
      if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ success: false, message: 'Internal server error' });
          return;
      }

      // Check if any rows were returned
      if (results.length > 0) {
          // Authentication successful
          res.status(200).json({ success: true, message: 'Login successful' });
      } else {
          // Authentication failed
          res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  });
});





app.post('/api/registre', (req, res) => {
  const { username, number, email, password } = req.body;

  // Prepare SQL query
  const userSql = "INSERT INTO users (username, password_hash, email, phone_number) VALUES (?, ?, ?, ?)";
  const userValues = [username, password, email, number];
  
  // Execute the query to insert user data
  connection.query(userSql, userValues, (err, userResults) => {
      if (err) {
          console.error('Error executing user SQL query:', err);
          res.status(500).json({ success: false, message: 'Error inserting user data' });
          return;
      }

      // Get the ID of the inserted user record
      const insertedId = userResults.insertId;

      // Prepare SQL query to insert patient data
      const patientSql = "INSERT INTO patients (user_id, username) VALUES (?, ?)";
      const patientValues = [insertedId, username];
      
      // Execute the query to insert patient data
      connection.query(patientSql, patientValues, (err, patientResults) => {
          if (err) {
              console.error('Error executing patient SQL query:', err);
              res.status(500).json({ success: false, message: 'Error inserting patient data' });
              return;
          }

          // Send success response if both queries executed successfully
          res.status(200).json({ success: true, message: 'Registration successful' });
      });
  });
});


app.post('/api/registreMedecin', (req, res) => {
  const { username, number, email, password, speciality } = req.body;

  // Prepare SQL query
  const userSql = "INSERT INTO users (username, password_hash, email, phone_number) VALUES (?, ?, ?, ?)";
  const userValues = [username, password, email, number];
  
  // Execute the query to insert user data
  connection.query(userSql, userValues, (err, userResults) => {
      if (err) {
          console.error('Error executing user SQL query:', err);
          res.status(500).json({ success: false, message: 'Error inserting user data' });
          return;
      }

      // Get the ID of the inserted user record
      const insertedId = userResults.insertId;

      // Prepare SQL query to insert patient data
      const medecinSql = "INSERT INTO doctors (user_id, username, speciality) VALUES (?, ?, ?)";
      const medecinValues = [insertedId, username, speciality];
      
      // Execute the query to insert patient data
      connection.query(medecinSql, medecinValues, (err, medecinResults) => {
          if (err) {
              console.error('Error executing patient SQL query:', err);
              res.status(500).json({ success: false, message: 'Error inserting patient data' });
              return;
          }

          // Send success response if both queries executed successfully
          res.status(200).json({ success: true, message: 'Registration successful' });
      });
  });
});


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



