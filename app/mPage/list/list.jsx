import React, { useState, useEffect } from 'react';
import styles from './List.module.css';

function List() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/appointments');
                const data = await response.json();
                if (data.success) {
                    setAppointments(data.acceptedAppointments);
                } else {
                    console.error('Error fetching accepted appointments:', data.message);
                }
            } catch (error) {
                console.error('Error fetching accepted appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Mes Prochains Rendez-vous</h1>
            <ul className={styles.appointmentsList}>
                {appointments.map(appointment => (
                    <li key={appointment.appointment_id} className={styles.appointmentItem}>
                        <h3>{appointment.patient_name}</h3>
                        <div className={styles.buttons}>
                            <button className={styles.sendMessageButton}>Envoyer un message</button>
                            <button className={styles.reportButton}>Reporter Rendez-vous</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default List;
