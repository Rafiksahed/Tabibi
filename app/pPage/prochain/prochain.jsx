import React, { useState, useEffect } from 'react';
import styles from './prochain.module.css';

function PatientList() {
    const [appointments, setAppointments] = useState([]); 
    const [selectedItem, setSelectedItem] = useState(0); 
    const [editing, setEditing] = useState(null); // État pour gérer quel rendez-vous est en cours d'édition
    const [newDateTime, setNewDateTime] = useState('');

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
                    throw new Error('Échec du chargement des rendez-vous des patients');
                }
            } catch (error) {
                console.error('Erreur lors du chargement des rendez-vous des patients :', error);
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
                return ''; // Ajouter une classe par défaut si nécessaire
        }
    };

    const handleEdit = (appointmentId, dateTime) => {
        setEditing(appointmentId);
        setNewDateTime(dateTime); // Initialiser avec la date/heure actuelle du rendez-vous
    };
    const handleCancel = () => {
        setEditing(null); // Arrête l'édition et cache l'input
    };
    
    const handleDateChange = (e) => {
        setNewDateTime(e.target.value);
    };

    const handleSave = async (appointmentId) => {
        // Appel API pour mettre à jour le rendez-vous
        try {
            const response = await fetch('http://localhost:3001/api/updateRdv', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({appointmentId, newDateTime, status: 'attente' }),
                credentials: 'include'
            });
            if (response.ok) {
                const updatedAppointments = appointments.map(app => {
                    if (app.appointment_id === appointmentId) {
                        return { ...app, date_time: newDateTime, status: 'attente' };
                    }
                    return app;
                });
                setAppointments(updatedAppointments);
                setEditing(null); // Réinitialiser l'état d'édition après avoir enregistré
            } else {
                throw new Error('Échec de la mise à jour du rendez-vous');
            }
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de la nouvelle date/heure :', error);
        }
    };
    
    const handleDelete = async (appointmentId) => {
        // Appel API pour annuler le rendez-vous
        try {
            const response = await fetch('http://localhost:3001/api/appointments/cancel', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ appointment_id: appointmentId }),
                credentials: 'include'
            });
            if (response.ok) {
                const updatedAppointments = appointments.filter(app => app.appointment_id !== appointmentId);
                setAppointments(updatedAppointments);
            } else {
                throw new Error('Échec de l\'annulation du rendez-vous');
            }
        } catch (error) {
            console.error('Erreur lors de l\'annulation du rendez-vous :', error);
        }
    };
    
    return (
        <div className={styles.dash}>
            <h1 className={styles.h1}>Mes prochain Rendez-vous</h1>
            <div className={styles.liste}>
                <ul>
                    {appointments.map((appointment, index) => (
                        <li key={appointment.appointment_id} className={`${styles.element} ${selectedItem === index ? styles.selected : ''}`}>
                            <div onClick={() => handleItemClick(index)}>
                                <h2 className={styles.date}>{formatDate(appointment.date_time)} h</h2>
                                <div className={styles.ctn_list}>
                                    <div className={styles.descr}>
                                        <h3 className={styles.name}>Dr {appointment.doctor_name}</h3>
                                        {editing === appointment.appointment_id ? (
                                       <div className={styles.update}>
                                        <input type="datetime-local" value={newDateTime} onChange={handleDateChange} className={styles.input}/>
                                        </div>
                                          ) : (
                                            <p></p>
                                         )}
                                        <p className={`${styles.status} ${getStatusStyle(appointment.status)}`}>Status : {appointment.status}</p>
                                        
                                    </div>
                                    <div className={styles.button}>
                                        {editing === appointment.appointment_id ? (
                                            <button className={styles.seconB} onClick={() => handleSave(appointment.appointment_id)}><b>Valider</b></button>
                                        ) : (
                                            <button className={styles.seconB} onClick={() => handleEdit(appointment.appointment_id, appointment.date_time)}><b>Reporter Rendez-vous</b></button>
                                            
                                        )}
                                        {editing === appointment.appointment_id ? (
                                            <button className={styles.mainB} onClick={() => handleCancel()}><b>Anuler</b></button>
                                        ) : (
                                            <button className={styles.mainB} onClick={() => handleDelete(appointment.appointment_id)}><b>Annuler Rendez-vous</b></button>
                                            
                                        )}
                                        
                                        
                                    </div>
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
