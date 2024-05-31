const connection = require('../../db');

const deleteUser = (req, res) => {
    const { user_id } = req.body;
    const sql = "DELETE FROM patients WHERE user_id = ?";
    const sql2 = "DELETE FROM doctors WHERE user_id = ?";
    const sql3 = "DELETE FROM users WHERE user_id = ?";
    const values = [user_id];

    connection.query(sql, values, (err, results) => {
        connection.query(sql3, values, (err, results) => {})
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
    });

    connection.query(sql2, values, (err, results) => {
        connection.query(sql3, values, (err, results) => {})
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
    });

};

module.exports = deleteUser;
