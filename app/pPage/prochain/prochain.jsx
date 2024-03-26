import React from 'react'
import styles from './prochain.module.css'


function Prochain() {
  

  return (
    <div className={styles.prochain}>
         <ul className={styles.liste}>
          
         <li className={styles.element2}>
            <div className={styles.ctn}>
               <h3 className={styles.date}>02/06/2024</h3>
               <p className={styles.info}>Dr happy happy Cardiologue</p>
               <p className={styles.mail}><span className={styles.span}>Email:</span> testfe09@gmail.com </p>
               <p><span className={styles.span}>Telephone:</span> 0634261748</p>
            </div>
            <div className={styles.button}>
              <p className={styles.confirm}>confirmé</p>
              <button className={styles.envoyer}>envoyer un message</button>
            </div>
            </li>


            <li className={styles.element}>
            <div className={styles.ctn}>
               <h3 className={styles.date}>08/06/2024</h3>
               <p className={styles.name}>Dr happy happy</p>
            </div>
            <div className={styles.button}>
              <p className={styles.attente}>en attente</p>
              <button className={styles.envoyer}>envoyer un message</button>
            </div>
            </li>
            <li className={styles.elementE}>
            <div className={styles.ctn}>
               <h3 className={styles.date}>02/03/2024</h3>
               <p className={styles.name}>Dr happy happy</p>
            </div>
            <div className={styles.button}>
              <p className={styles.expirer}>Expirer</p>
              <button className={styles.envoyer}>envoyer un message</button>
            </div>
            </li>
         </ul>
    </div>
  )
}

export default Prochain