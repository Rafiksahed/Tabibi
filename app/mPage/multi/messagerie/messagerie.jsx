import React, { useState, useEffect } from 'react';
import styles from './messagerie.module.css';

const Messagerie = () => {
  const [patients, setPatients] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [doctorUserId, setDoctorUserId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null); // Ajouté pour le patient sélectionné

  useEffect(() => {
    fetchPatients();
    fetchConversations();
    fetchDoctorUserId();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch('http://localhost:3001/api/doctor/patients', {
      credentials: 'include',
    });
    const data = await res.json();
    setPatients(data.patients);
  };

  const fetchConversations = async () => {
    const res = await fetch('http://localhost:3001/api/conversations', {
      credentials: 'include',
    });
    const data = await res.json();
    setConversations(data.conversations);
  };

  const fetchMessages = async (conversationId) => {
    const res = await fetch(`http://localhost:3001/api/messages?conversationId=${conversationId}`, {
      credentials: 'include',
    });
    const data = await res.json();
    setMessages(data.messages);
    setSelectedConversation(conversationId);
  };

  const fetchDoctorUserId = async () => {
    const res = await fetch('http://localhost:3001/api/doctor/user', {
      credentials: 'include',
    });
    const data = await res.json();
    setDoctorUserId(data.user_id);
  };

  const handlePatientSelect = async (patientId) => {
    setSelectedPatient(patientId); // Met à jour le patient sélectionné
    const res = await fetch('http://localhost:3001/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ participantId: patientId }),
    });
    const data = await res.json();
    if (data.success) {
      fetchConversations();
      fetchMessages(data.conversationId);
    } else {
      console.error('Error creating or fetching conversation:', data.message);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    await fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ conversationId: selectedConversation, messageText: newMessage }),
    });

    setNewMessage('');
    fetchMessages(selectedConversation);
  };

  return (
    <div className={styles.messagingContainer}>
      <div className={styles.patientList}>
        <ul>
          {patients.map((patient) => (
            <li
              key={patient.patient_id}
              onClick={() => handlePatientSelect(patient.patient_id)}
              className={patient.patient_id === selectedPatient ? styles.selectedPatient : ''}
            >
              {patient.username}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.messageArea}>
        <div className={styles.messagerie}>
          <div className={styles.messages}>
            {messages.map((message) => (
              <div
                key={message.message_id}
                className={`${styles.message} ${message.sender_id === doctorUserId ? styles.doctor : styles.other}`}
              >
                 {message.message_text}
              </div>
            ))}
          </div>
          {selectedConversation && (
            <div className={styles.newMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage} className={styles.send}>envoyer</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messagerie;
