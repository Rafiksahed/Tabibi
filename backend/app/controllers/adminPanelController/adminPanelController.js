const connection = require('../../db');

const adminPanel = (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }


    const doctorId = req.session.user.doctor_id
    const username = req.session.user.username
    const email = req.session.user.email
    console.log(email, username)
    if(email=='admintabibi@gmail.com' && username == 'admin'){
    
    const sql = "SELECT * FROM users";

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        
        // Send the fetched data back as a response
        res.status(200).json({ success: true, data: results });
    });
};
}



module.exports = adminPanel;