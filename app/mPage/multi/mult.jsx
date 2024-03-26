import React, { useState } from 'react';
import styles from './mult.module.css';
import Messagerie from './messagerie/messagerie';
import Confirm from './confirmation/confirm';

function Mult() {
  const [selectedTab, setSelectedTab] = useState('confirmation'); // État pour suivre l'onglet actuellement sélectionné

  // Fonction pour changer l'onglet sélectionné
  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className={styles.mult}>
      <ul className={styles.list}>
        <li className={`${styles.tab} ${selectedTab === 'confirmation' ? styles.selected : ''}`} onClick={() => handleTabChange('confirmation')}>
          <button className={styles.button}><h3>Confirmation de Rendez-vous</h3></button>
        </li>
        <li className={`${styles.tab} ${selectedTab === 'message' ? styles.selected : ''}`} onClick={() => handleTabChange('message')}>
          <button className={styles.button}><h3>Messagerie</h3></button>
        </li>
      </ul>
      <div>
        {selectedTab === 'confirmation' ? <Confirm /> : <Messagerie />}
      </div>
    </div>
  );
}

export default Mult;
