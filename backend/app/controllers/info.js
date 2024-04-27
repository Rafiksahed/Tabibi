const connection = require('../db');

const info = (req, res) => {
    let sql = "SELECT * FROM doctors";
    const speciality = req.query.speciality;
    if (speciality) {
        sql += ` WHERE speciality = '${speciality}'`;
    }
    const username = req.query.username;
    if (username) {
        sql += ` WHERE username LIKE '%${username}%'`;
    }
    connection.query(sql, (err, rows, fields) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
};

module.exports = info;
