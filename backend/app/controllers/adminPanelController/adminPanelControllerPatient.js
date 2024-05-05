const connection = require('../../db');


const adminPanelPatient = (req, res) => {
    const sql = "SELECT * FROM patients";

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




module.exports = adminPanelPatient;