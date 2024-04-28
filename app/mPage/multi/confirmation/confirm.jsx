import React, { useState, useEffect } from 'react';
import styles from './confirm.module.css';

function Confirm() {
    const [appointments, setAppointments] = useState([]); // État pour stocker les rendez-vous en attente

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/pendingAppointment', {
                    credentials: 'include' // Assurez-vous d'inclure les credentials si nécessaire
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    setAppointments(data.acceptedAppointments); // Stocker les données dans l'état
                } else {
                    throw new Error('Failed to fetch appointments');
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    // Fonction pour formater les dates
    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className={styles.main}>
            <ul className={styles.list}>
                {appointments.map((appointment) => (
                    <li key={appointment.appointment_id} className={styles.element}>
                        <div className={styles.ctn}>
                            <h3 className={styles.h}>pour le {formatDate(appointment.date_time)}</h3>
                            <p>{appointment.patient_name}</p>
                        </div>
                        <button className={styles.confirm}>Confirmer</button>
                        <button className={styles.decline}>Décliner</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Confirm;
