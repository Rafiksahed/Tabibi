const connection = require('../../db');


const adminPanelMedecin = (req, res) => {
    const sql = "SELECT * FROM rendez_vous";

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




module.exports = adminPanelMedecin;