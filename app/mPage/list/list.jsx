"use client"

import React, { useState, useEffect } from 'react';
import styles from './List.module.css';

function List() {
  const [selectedItem, setSelectedItem] = useState(0); // État pour suivre l'élément sélectionné
  const [appointments, setAppointments] = useState([]); // État pour stocker les rendez-vous acceptés

  useEffect(() => {
    // Fonction pour charger les rendez-vous acceptés pour l'utilisateur depuis l'API
    const fetchAppointments = async () => {
      try {
        // Récupérer l'ID utilisateur depuis la session
        const userId = sessionStorage.getItem('loggedInUser');
        if (!userId) {
          console.error('User ID not found in session.');
          return;
        }

        // Appel à l'API pour récupérer les rendez-vous acceptés pour l'utilisateur
        const response = await fetch(`http://localhost:3001/api/appointments/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data); // Mettre à jour les rendez-vous dans l'état
      } catch (error) {
        console.error('Error fetching appointments:', error.message);
      }
    };

    fetchAppointments(); // Appeler la fonction au chargement du composant
  }, []); // Le tableau vide en tant que deuxième argument assure que cette fonction ne s'exécute qu'une fois au montage

  const handleItemClick = (index) => {
    setSelectedItem(index); // Met à jour l'état avec l'index de l'élément cliqué
  };

  return (
    <div className={styles.dash}>
      <h1 className={styles.hC}>Mes Prochains<br/>Rendez-vous</h1>
      <div className={styles.liste}>
        <ul>
          {appointments.map((appointment, index) => (
            <li 
              key={index}
              className={`${styles.element} ${selectedItem === index ? styles.selected : ''}`}
              onClick={() => handleItemClick(index)}
            >
              <h2 className={styles.date}>{appointment.date}</h2>
              <div className={styles.ctn_list}>
                <div className={styles.descr}>
                  <h3 className={styles.name}>{appointment.patientName}</h3>
                  <p className={styles.details}>plus de detail</p>
                </div>
                <div className={styles.button}>
                  <button className={styles.mainB}><b>Envoyer un message</b></button>
                  <button className={styles.seconB}><b>Reporter  Rendez-vous</b></button>
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
