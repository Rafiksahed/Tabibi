import React, { useState, useEffect } from 'react';
import styles from './List.module.css';

function List() {
    const [appointments, setAppointments] = useState([]);
    const [selectedItem, setSelectedItem] = useState(0);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/appointments', {
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.success && response.ok) {
                    const sortedAppointments = sortAppointmentsByDate(data.acceptedAppointments);
                    setAppointments(sortedAppointments);
                    if (sortedAppointments.length > 0) {
                        setSelectedItem(0);
                    }
                } else {
                    throw new Error('Failed to fetch appointments');
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const sortAppointmentsByDate = (appointments) => {
        const currentDate = new Date();
        const futureAppointments = [];
        const pastAppointments = [];
        appointments.forEach(appointment => {
            if (new Date(appointment.date_time) >= currentDate) {
                futureAppointments.push(appointment);
            } else {
                pastAppointments.unshift(appointment);
            }
        });
        return [...futureAppointments, ...pastAppointments];
    };

    const handleItemClick = (index) => {
        setSelectedItem(index);
    };

    const formatDate = (dateTime) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleDateString('fr-FR', options);
    };

    const cancelAppointment = async (appointmentId) => {
        console.log('Annulation du rendez-vous:', appointmentId); // Vérifiez si ceci s'affiche
        try {
            const response = await fetch('http://localhost:3001/api/appointments/cancel', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ appointment_id: appointmentId }),
                credentials: 'include' // Assurez-vous d'inclure les credentials
            });

            const data = await response.json();
            console.log('Réponse de l\'API:', data); // Ajoutez ceci pour voir la réponse
            if (data.success) {
                setAppointments(prevAppointments =>
                    prevAppointments.filter(appointment => appointment.appointment_id !== appointmentId)
                );
            } else {
                console.error('Error cancelling appointment:', data.message);
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error);
        }
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
                                    <p className={styles.details}>telephone : {appointment.phone_number}</p>
                                    <p className={styles.details}>{appointment.email}</p>
                                </div>
                                <div className={styles.button}>
                                    <button className={styles.mainB}><b>Envoyer un message</b></button>
                                    <button 
                                        className={styles.seconB}
                                        onClick={() => cancelAppointment(appointment.appointment_id)}
                                    >
                                        <b>Annuler Rendez-vous</b>
                                    </button>
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
