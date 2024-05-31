const connection = require('../db');

// Get patients for a doctor based on accepted appointments
module.exports.getPatientsForDoctor = (req, res) => {
  const doctorId = req.session.user.doctor_id;

  const sql = `
    SELECT DISTINCT p.patient_id, u.username
    FROM patients p
    JOIN users u ON p.user_id = u.user_id
    JOIN rendez_vous r ON p.patient_id = r.patient_id
    WHERE r.doctor_id = ? AND r.status = 'accepted'
  `;

  connection.query(sql, [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }
    res.status(200).json({ success: true, patients: results });
  });
};

// Get all conversations for a doctor
module.exports.getConversations = (req, res) => {
  const doctorId = req.session.user.doctor_id;

  const sql = `
    SELECT c.conversation_id, c.participant1_id, c.participant2_id, u1.username as participant1, u2.username as participant2
    FROM conversations c
    JOIN users u1 ON c.participant1_id = u1.user_id
    JOIN users u2 ON c.participant2_id = u2.user_id
    WHERE c.participant1_id = ? OR c.participant2_id = ?
  `;

  connection.query(sql, [doctorId, doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching conversations:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }
    res.status(200).json({ success: true, conversations: results });
  });
};

// Get all messages for a conversation
module.exports.getMessages = (req, res) => {
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

// Send a message
module.exports.sendMessage = (req, res) => {
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

// Create a new conversation
module.exports.createConversation = (req, res) => {
  const { participantId } = req.body;
  const doctorId = req.session.user.doctor_id;

  // Get the user ID for the patient
  const getUserSql = `
    SELECT user_id
    FROM patients
    WHERE patient_id = ?
  `;

  connection.query(getUserSql, [participantId], (err, results) => {
    if (err) {
      console.error('Error fetching user ID for patient:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(400).json({ success: false, message: 'Patient not found' });
      return;
    }

    const patientUserId = results[0].user_id;

    // Check if a conversation already exists between the doctor and the patient
    const checkSql = `
      SELECT conversation_id
      FROM conversations
      WHERE (participant1_id = ? AND participant2_id = ?)
         OR (participant1_id = ? AND participant2_id = ?)
    `;

    connection.query(checkSql, [doctorId, patientUserId, patientUserId, doctorId], (err, results) => {
      if (err) {
        console.error('Error checking existing conversation:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (results.length > 0) {
        res.status(200).json({ success: true, conversationId: results[0].conversation_id });
        return;
      }

      // If no conversation exists, create a new one
      const insertSql = `
        INSERT INTO conversations (participant1_id, participant2_id)
        VALUES (?, ?)
      `;

      connection.query(insertSql, [doctorId, patientUserId], (err, results) => {
        if (err) {
          console.error('Error creating conversation:', err);
          res.status(500).json({ success: false, message: 'Internal server error' });
          return;
        }
        res.status(200).json({ success: true, conversationId: results.insertId });
      });
    });
  });
};
