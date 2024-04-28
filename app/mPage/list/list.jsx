"use client";

import React, { useState, useEffect } from 'react';
import styles from './List.module.css';

function List() {
    const [appointments, setAppointments] = useState([]); // État pour stocker les rendez-vous
    const [selectedItem, setSelectedItem] = useState(null); // État pour suivre l'élément sélectionné

    // Fonction pour charger les rendez-vous depuis la base de données
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/appointments', {
                    credentials: 'include' // Assurez-vous d'inclure les credentials si nécessaire
                });
                const data = await response.json();
                if (data.success && response.ok) {
                    setAppointments(data.acceptedAppointments); // Stocker les données dans l'état
                } else {
                    throw new Error('Failed to fetch appointments');
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []); // Ce tableau vide signifie que l'effet ne s'exécutera qu'après le premier rendu

    // Gestion des clics sur les éléments
    const handleItemClick = (index) => {
        setSelectedItem(index); // Met à jour l'état avec l'index de l'élément cliqué
    };

    // Formater la date et l'heure pour l'affichage
    const formatDate = (dateTime) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleDateString('fr-FR', options);
    };

    return (
        <div className={styles.dash}>
            <h1 className={styles.hC}>Mes Prochains<br/>Rendez-vous</h1>
            <div className={styles.liste}>
                <ul>
                    {appointments.map((appointment, index) => (
                        <li 
                            key={appointment.appointment_id}
                            className={`${styles.element} ${selectedItem === index ? styles.selected : ''}`}
                            onClick={() => handleItemClick(index)}
                        >
                            <h2 className={styles.date}>{formatDate(appointment.date_time)}</h2>
                            <div className={styles.ctn_list}>
                                <div className={styles.descr}>
                                    <h3 className={styles.name}>{appointment.patient_name}</h3>
                                    <p className={styles.details}>Détails supplémentaires ici</p>
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

export default List;
