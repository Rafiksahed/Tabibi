const connection = require('../db');

module.exports = (req, res) => {
    // Vérifier si l'utilisateur est connecté et s'il est un médecin

    const user = req.session.user;
    console.log(req.session);
    if (!user || !user.doctor_id) {
        res.status(401).json({ success: false, message: 'Unauthorized access' });
        return;
    }

    const doctorId = user.doctor_id;

    // Requête SQL pour récupérer les rendez-vous acceptés du médecin avec les détails du patient
    const sql = `
        SELECT rv.appointment_id, p.username AS patient_name, rv.date_time
        FROM rendez_vous rv
        INNER JOIN patients p ON rv.patient_id = p.patient_id
        WHERE rv.doctor_id = ? AND rv.status = 'accepted'
        ORDER BY rv.date_time ASC
    `;
    const values = [doctorId];

    // Exécution de la requête SQL
    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching accepted doctor appointments:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        // Envoi des rendez-vous acceptés récupérés en tant que réponse
        res.status(200).json({ success: true, acceptedAppointments: results });
    });
};
