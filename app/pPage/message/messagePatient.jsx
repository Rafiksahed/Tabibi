import React, { useState, useEffect } from 'react';
import styles from './message.module.css';

const PatientMessagerie = () => {
  const [doctors, setDoctors] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [patientUserId, setPatientUserId] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Ajouté pour le médecin sélectionné

  useEffect(() => {
    fetchDoctors();
    fetchConversations();
    fetchPatientUserId();
  }, []);

  const fetchDoctors = async () => {
    const res = await fetch('http://localhost:3001/api/patient/doctors', {
      credentials: 'include',
    });
    const data = await res.json();
    setDoctors(data.doctors);
  };

  const fetchConversations = async () => {
    const res = await fetch('http://localhost:3001/api/patient/conversations', {
      credentials: 'include',
    });
    const data = await res.json();
    setConversations(data.conversations);
  };

  const fetchMessages = async (conversationId) => {
    const res = await fetch(`http://localhost:3001/api/patient/messages?conversationId=${conversationId}`, {
      credentials: 'include',
    });
    const data = await res.json();
    setMessages(data.messages);
    setSelectedConversation(conversationId);
  };

  const fetchPatientUserId = async () => {
    const res = await fetch('http://localhost:3001/api/patient/user', {
      credentials: 'include',
    });
    const data = await res.json();
    setPatientUserId(data.user_id);
  };

  const handleDoctorSelect = async (doctorId) => {
    setSelectedDoctor(doctorId); // Met à jour le médecin sélectionné
    const res = await fetch('http://localhost:3001/api/patient/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ doctorId }),
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

    await fetch('http://localhost:3001/api/patient/messages', {
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
      <div className={styles.doctorList}>
        <h3 className={styles.dH3}>Doctors</h3>
        <ul>
          {doctors.map((doctor) => (
            <li
              key={doctor.user_id}
              onClick={() => handleDoctorSelect(doctor.doctor_id)}
              className={doctor.doctor_id === selectedDoctor ? styles.selectedDoctor : ''}
            >
              {doctor.username}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.messageArea}>
        <div className={styles.messages}>
          {messages.map((message) => (
            <div
              key={message.message_id}
              className={`${styles.message} ${message.sender_id === patientUserId ? styles.patient : styles.doctor}`}
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
  );
};

export default PatientMessagerie;
