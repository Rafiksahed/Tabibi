const connection = require('../db');

const fetchinfo = (req, res) => {
    // Check if the user is authenticated and has a doctor_id
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const doctorId = req.session.user.doctor_id;
    const patientId = req.session.user.patient_id;
    const doctorUsername = req.session.user.username;
    console.log(doctorId);
    console.log(doctorUsername);

    if (doctorId !== null){
    const sql = `
        SELECT doctors.username, doctors.speciality, doctors.ville, doctors.adresse, users.email, users.phone_number
        FROM doctors
        INNER JOIN users ON doctors.user_id = users.user_id
        WHERE doctors.doctor_id = ?;
    `;

    const values = [doctorId];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching doctor profile:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        // Check if any result is returned
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        console.log(results);
        res.status(200).json({ success: true, profiledata: results });
    });
}
else{

    
    const sql = `
        SELECT patients.username, users.email, users.phone_number
        FROM patients
        INNER JOIN users ON patients.user_id = users.user_id
        WHERE patients.patient_id = ?;
    `;

    const values = [patientId];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching doctor profile:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        // Check if any result is returned
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        console.log(results);
        res.status(200).json({ success: true, profiledata: results });
    });
}
};

module.exports = fetchinfo;
