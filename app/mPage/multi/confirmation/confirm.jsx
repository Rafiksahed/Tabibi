import React from 'react'
import styles from './confirm.module.css'


function Confirm() {
   

  return (
    <div className={styles.main}>

        <ul className={styles.list}>
            <li className={styles.element}>
              <div className={styles.ctn}>
                <h3 className={styles.h}>pour le 01/04/2024</h3>
                <p>Mr tes dd</p>
              </div>
              <button className={styles.confirm}>confirm</button>
              <button className={styles.decline}>decline</button>
            </li>

            <li className={styles.element}>
              <div className={styles.ctn}>
                <h3 className={styles.h}>pour le 01/04/2024</h3>
                <p>Mr tes dd</p>
              </div>
              <button className={styles.confirm}>confirm</button>
              <button className={styles.decline}>decline</button>
            </li>

            <li className={styles.element}>
              <div className={styles.ctn}>
                <h3 className={styles.h}>pour le 01/04/2024</h3 >
                <p>Mr tes dd</p>
              </div>
              <button className={styles.confirm}>confirm</button>
              <button className={styles.decline}>decline</button>
            </li>
        </ul>

    </div>
  )
}

export default Confirm