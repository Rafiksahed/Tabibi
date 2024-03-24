"use client"

import React, { useState } from 'react';
import styles from './List.module.css';

function List() {
    const [selectedItem, setSelectedItem] = useState(0); // État pour suivre l'élément sélectionné

    const handleItemClick = (index) => {
        setSelectedItem(index); // Met à jour l'état avec l'index de l'élément cliqué
    };

  return (
    <div className={styles.dash}>
                <h1 className={styles.hC}>Mes Prochains<br/>Rendez-vous</h1>
                <div className={styles.liste}>
                    <ul>
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <li 
                                key={index}
                                className={`${styles.element} ${selectedItem === index ? styles.selected : ''}`}
                                onClick={() => handleItemClick(index)}
                            >
                                <h2 className={styles.date}>01/04/2024</h2>
                                <div className={styles.ctn_list}>
                                    <div className={styles.descr}>
                                        <h3 className={styles.name}>Mr Test klm</h3>
                                        <p className={styles.details}>plus de detail</p>
                                    </div>
                                    <button className={styles.mainB}><b>Envoyer un message</b></button>
                                    <button className={styles.seconB}><b>Reporter Rendez-vous</b></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
  )
}

export default List