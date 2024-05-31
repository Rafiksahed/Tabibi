const connection = require('../db');

module.exports.getDoctorsForPatient = (req, res) => {
    const patientId = req.session.user.patient_id;

    const sql = `
        SELECT DISTINCT d.doctor_id, u.username, u.user_id
        FROM doctors d
        JOIN users u ON d.user_id = u.user_id
        JOIN rendez_vous r ON d.doctor_id = r.doctor_id
        WHERE r.patient_id = ? AND r.status = 'accepted'
    `;

    connection.query(sql, [patientId], (err, results) => {
        if (err) {
            console.error('Error fetching doctors:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        res.status(200).json({ success: true, doctors: results });
    });
};

module.exports.getConversationsForPatient = (req, res) => {
    const userId = req.session.user.user_id;

    const sql = `
        SELECT c.conversation_id, c.participant1_id, c.participant2_id, u1.username as participant1, u2.username as participant2
        FROM conversations c
        JOIN users u1 ON c.participant1_id = u1.user_id
        JOIN users u2 ON c.participant2_id = u2.user_id
        WHERE c.participant1_id = ? OR c.participant2_id = ?
    `;

    connection.query(sql, [userId, userId], (err, results) => {
        if (err) {
            console.error('Error fetching conversations:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        res.status(200).json({ success: true, conversations: results });
    });
};

module.exports.getMessagesForPatient = (req, res) => {
    const { conversationId } = req.query;

    const sql = `
        SELECT m.message_id, m.conversation_id, m.sender_id, u.username as sender, m.message_text, m.timestamp
        FROM messages m
        JOIN users u ON m.sender_id = u.user_id
        WHERE m.conversation_id = ?
        ORDER BY m.timestamp DESC
    `;

    connection.query(sql, [conversationId], (err, results) => {
        if (err) {
            console.error('Error fetching messages:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        res.status(200).json({ success: true, messages: results });
    });
};

module.exports.sendMessageForPatient = (req, res) => {
    const { conversationId, messageText } = req.body;
    const senderId = req.session.user.user_id;

    const sql = `
        INSERT INTO messages (conversation_id, sender_id, message_text, timestamp)
        VALUES (?, ?, ?, NOW())
    `;

    connection.query(sql, [conversationId, senderId, messageText], (err, results) => {
        if (err) {
            console.error('Error sending message:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        res.status(200).json({ success: true });
    });
};

module.exports.createConversationForPatient = (req, res) => {
    const { doctorId } = req.body;
    const patientUserId = req.session.user.user_id;

    // Log des IDs
    console.log(`Creating conversation: patientUserId=${patientUserId}, doctorId=${doctorId}`);

    // Obtenir l'ID utilisateur du médecin
    const getUserSql = `
        SELECT user_id
        FROM doctors
        WHERE doctor_id = ?
    `;

    connection.query(getUserSql, [doctorId], (err, results) => {
        if (err) {
            console.error('Error fetching user ID for doctor:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(400).json({ success: false, message: 'Doctor not found' });
            return;
        }

        const doctorUserId = results[0].user_id;

        // Vérifier si une conversation existe déjà entre le patient et le médecin
        const checkSql = `
            SELECT conversation_id
            FROM conversations
            WHERE (participant1_id = ? AND participant2_id = ?)
               OR (participant1_id = ? AND participant2_id = ?)
        `;

        connection.query(checkSql, [patientUserId, doctorUserId, doctorUserId, patientUserId], (err, results) => {
            if (err) {
                console.error('Error checking existing conversation:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }

            if (results.length > 0) {
                console.log('Existing conversation found');
                res.status(200).json({ success: true, conversationId: results[0].conversation_id });
                return;
            }

            // Si aucune conversation n'existe, en créer une nouvelle
            const insertSql = `
                INSERT INTO conversations (participant1_id, participant2_id)
                VALUES (?, ?)
            `;

            connection.query(insertSql, [patientUserId, doctorUserId], (err, results) => {
                if (err) {
                    console.error('Error creating conversation:', err);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                    return;
                }
                console.log('New conversation created with ID:', results.insertId);
                res.status(200).json({ success: true, conversationId: results.insertId });
            });
        });
    });
};
