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
    
    // Fonction pour formater les dates avec l'heure
    /**const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };**/
    const formatDateTime = (dateTime) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleDateString('fr-FR', options);
    };

    // Fonction pour confirmer un rendez-vous
    const handleConfirmAppointment = async (appointmentId) => {
        try {
            const response = await fetch('http://localhost:3001/api/accept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ appointmentId }),
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok && data.success) {
                // Mettre à jour les rendez-vous après la confirmation
                const updatedAppointments = appointments.filter(appointment => appointment.appointment_id !== appointmentId);
                setAppointments(updatedAppointments);
            } else {
                throw new Error(data.message || 'Failed to confirm appointment');
            }
        } catch (error) {
            console.error('Error confirming appointment:', error);
        }
    };

    // Fonction pour décliner un rendez-vous
    const handleDeclineAppointment = async (appointmentId) => {
        try {
            const response = await fetch('http://localhost:3001/api/decline', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ appointmentId }),
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok && data.success) {
                // Mettre à jour les rendez-vous après le déclin
                const updatedAppointments = appointments.filter(appointment => appointment.appointment_id !== appointmentId);
                setAppointments(updatedAppointments);
            } else {
                throw new Error(data.message || 'Failed to decline appointment');
            }
        } catch (error) {
            console.error('Error declining appointment:', error);
        }
    };
    
    return (
        <div className={styles.main}>
            <ul className={styles.list}>
                {appointments.map((appointment) => (
                    <li key={appointment.appointment_id} className={styles.element}>
                        <div className={styles.ctn}>
                            <h3 className={styles.h}>le {formatDateTime(appointment.date_time)} h</h3>
                            <p>{appointment.patient_name}</p>
                        </div>
                        <button className={styles.confirm} onClick={() => handleConfirmAppointment(appointment.appointment_id)}>Confirmer</button>
                        <button className={styles.decline} onClick={() => handleDeclineAppointment(appointment.appointment_id)}>Décliner</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Confirm;
