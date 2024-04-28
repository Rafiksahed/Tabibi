const connection = require('../db'); // Importez le module connection ici

const getDoctorAppointments = (req, res) => {
    // Récupérer l'ID du médecin à partir de la session
    const doctorId = req.session.user.user_id;

    // Requête SQL pour récupérer les rendez-vous acceptés du médecin avec les détails du patient
    const acceptedSql = `
        SELECT rv.appointment_id, p.username AS patient_name, rv.date_time
        FROM rendez_vous rv
        INNER JOIN patients p ON rv.patient_id = p.patient_id
        WHERE rv.doctor_id = ? AND rv.status = 'accepted'
        ORDER BY rv.date_time ASC
    `;
    const acceptedValues = [doctorId];

    // Requête SQL pour récupérer les rendez-vous en attente du médecin avec les détails du patient
    const pendingSql = `
        SELECT rv.appointment_id, p.username AS patient_name, rv.date_time
        FROM rendez_vous rv
        INNER JOIN patients p ON rv.patient_id = p.patient_id
        WHERE rv.doctor_id = ? AND rv.status = 'attente'
        ORDER BY rv.date_time ASC
    `;
    const pendingValues = [doctorId];

    // Exécution des deux requêtes SQL
    connection.query(acceptedSql, acceptedValues, (errAccepted, acceptedResults) => {
        if (errAccepted) {
            console.error('Error fetching accepted doctor appointments:', errAccepted);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        connection.query(pendingSql, pendingValues, (errPending, pendingResults) => {
            if (errPending) {
                console.error('Error fetching pending doctor appointments:', errPending);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }

            // Envoi des rendez-vous acceptés et en attente récupérés en tant que réponse
            res.status(200).json({ success: true, acceptedAppointments: acceptedResults, pendingAppointments: pendingResults });
        });
    });
};

module.exports = { getDoctorAppointments };
