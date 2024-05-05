const connection = require('../../db');

const adminPanel = (req, res) => {
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
const adminPanelMedecin = (req, res) => {
    const sql = "SELECT * FROM doctors";

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



module.exports = adminPanel;