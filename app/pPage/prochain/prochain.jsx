import React, { useState, useEffect } from 'react';
import styles from './prochain.module.css';

function PatientList() {
    const [appointments, setAppointments] = useState([]); 
    const [selectedItem, setSelectedItem] = useState(0); 

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/patientRdv', {
                    credentials: 'include' 
                });
                const data = await response.json();
                if (data.success && response.ok) {
                    const updatedAppointments = updateExpiredAppointments(data.patientAppointments);
                    setAppointments(updatedAppointments); 
                    if (updatedAppointments.length > 0) {
                        setSelectedItem(0); 
                    }
                } else {
                    throw new Error('Failed to fetch patient appointments');
                }
            } catch (error) {
                console.error('Error fetching patient appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const updateExpiredAppointments = (appointments) => {
        const currentDate = new Date();
        // Séparer les rendez-vous expirés des rendez-vous actifs
        const activeAppointments = [];
        const expiredAppointments = [];
        appointments.forEach(appointment => {
            if (new Date(appointment.date_time) < currentDate) {
                expiredAppointments.push({ ...appointment, status: 'expiré' });
            } else {
                activeAppointments.push(appointment);
            }
        });
        // Retourner les rendez-vous actifs suivis des rendez-vous expirés
        return [...activeAppointments, ...expiredAppointments];
    };

    const handleItemClick = (index) => {
        setSelectedItem(index); 
    };

    const formatDate = (dateTime) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleDateString('fr-FR', options);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'accepted':
                return styles.acceptedStatus;
            case 'attente':
                return styles.pendingStatus;
            case 'expiré':
                return styles.expiredStatus;
            default:
                return ''; // Ajoutez ici une classe par défaut si nécessaire
        }
    };

    return (
        <div className={styles.dash}>
           <div className={styles.liste}>
                <ul>
                    {appointments.map((appointment, index) => (
                        <li 
                            key={appointment.appointment_id}
                            className={`${styles.element} ${selectedItem === index ? styles.selected : ''}`}
                            onClick={() => handleItemClick(index)}
                        >
                            <h2 className={styles.date}>{formatDate(appointment.date_time)} h</h2>
                            <div className={styles.ctn_list}>
                                <div className={styles.descr}>
                                    <h3 className={styles.name}>Dr {appointment.doctor_name}</h3>
                                    <p className={`${styles.status} ${getStatusStyle(appointment.status)}`}>Status : {appointment.status}</p> {/* Affichage du statut */}
                                    <p className={styles.details}>plus de details</p>
                                </div>
                                <div className={styles.button}>
                                    <button className={styles.mainB}><b>Envoyer un message</b></button>
                                    <button className={styles.seconB}><b>Reporter Rendez-vous</b></button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PatientList;
