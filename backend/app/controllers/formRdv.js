const connection = require('../db');

 module.exports = (req, res) => {
    const { dateTime, username } = req.body;
    const doctorId = req.session.doctorId;
  
    // Convertir la date et l'heure au format MySQL
    const formattedDateTime = new Date(dateTime).toISOString().slice(0, 19).replace('T', ' ');
  
    const insertQuery = `INSERT INTO rendez_vous (doctor_id, patient_id, date_time, status)
                        VALUES (?, NULL, ?, NULL)`;
  
    connection.query(insertQuery, [doctorId, formattedDateTime], (error, results) => {
      if (error) {
        console.error("Erreur lors de l'insertion du rendez-vous :", error);
        return res.status(500).json({ message: "Erreur lors de l'insertion du rendez-vous." });
      }
  
      console.log("Rendez-vous inséré avec succès !");
      return res.status(200).json({ message: "Rendez-vous ajouté avec succès." });
    });
  };