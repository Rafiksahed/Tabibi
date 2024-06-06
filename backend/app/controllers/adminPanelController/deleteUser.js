/*const connection = require('../../db');

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
*/

const connection = require('../../db');

const deleteUser = (req, res) => {
    const { user_id } = req.body;

    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        const deletePatients = 'DELETE FROM patients WHERE user_id = ?';
        const deleteDoctors = 'DELETE FROM doctors WHERE user_id = ?';
        const deleteUser = 'DELETE FROM users WHERE user_id = ?';

        connection.query(deletePatients, [user_id], (err, results) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error executing SQL query for patients:', err);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                });
            }

            connection.query(deleteDoctors, [user_id], (err, results) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error executing SQL query for doctors:', err);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                    });
                }

                connection.query(deleteUser, [user_id], (err, results) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error executing SQL query for users:', err);
                            res.status(500).json({ success: false, message: 'Internal server error' });
                        });
                    }

                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error('Error committing transaction:', err);
                                res.status(500).json({ success: false, message: 'Internal server error' });
                            });
                        }

                        res.status(200).json({ success: true, message: 'User deleted successfully' });
                    });
                });
            });
        });
    });
};

module.exports = deleteUser;
