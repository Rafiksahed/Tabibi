'use client'

import React, { useEffect } from 'react'
import styles from './page.module.css'
import Login from '../components/inscrire/Login'

function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        document.body.style.overflow = "hidden"; // Or your desired DOM manipulation
      }, []);
    
  return (
    <div>
      <div className={styles.login}>
        <Login />
        </div>
    </div>
  )
}

export default page