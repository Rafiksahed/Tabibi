const connection = require('../db');

// Récupérer les rendez-vous d'un médecin
module.exports.getAppointments = (req, res) => {
  const { doctorId } = req.query;

  const sql = `
    SELECT date_time
    FROM rendez_vous
    WHERE doctor_id = ? AND status = 'accepted'
  `;

  connection.query(sql, [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }
    res.status(200).json({ success: true, appointments: results });
  });
};

// Réserver un rendez-vous
module.exports.bookAppointment = (req, res) => {
  if (!req.session.user || !req.session.user.patient_id) {
    res.status(401).json({ success: false, message: 'Unauthorized access' });
    return;
  }

  const { doctor_id, date_time } = req.body;
  const patient_id = req.session.user.patient_id;

  const sql = `
    INSERT INTO rendez_vous (doctor_id, patient_id, date_time, status)
    VALUES (?, ?, ?, 'attente')
  `;

  connection.query(sql, [doctor_id, patient_id, date_time], (err, results) => {
    if (err) {
      console.error('Error booking appointment:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }
    res.status(200).json({ success: true, appointmentId: results.insertId });
  });
};

