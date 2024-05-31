const connection = require('../db');

module.exports = (req, res) => {
    const { email, password } = req.body;
    
     

    const sql = "SELECT u.user_id, u.username, d.doctor_id, p.patient_id, u.email FROM users u LEFT JOIN doctors d ON u.user_id = d.user_id LEFT JOIN patients p ON u.user_id = p.user_id WHERE u.email = ? AND u.password_hash = ?";
    const values = [email, password];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            
            const user = results[0];
            let userType = '';

            if (user.doctor_id) {
                userType = 'medecin';
            } else if (user.patient_id) {
                userType = 'patient';
            }

            if (!userType) {
                res.status(401).json({ success: false, message: 'Invalid user' });
                return;
            }

            req.session.user = user; // Stockage des informations de l'utilisateur dans la session
            res.status(200).json({ success: true, message: 'Login successful', userType: userType, username: user.username.replace(/\s+/g, ''), user_id: user.user_id, email: user.email});
            console.log(user.username);
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    });
};
