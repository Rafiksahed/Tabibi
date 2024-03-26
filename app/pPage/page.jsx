"use client"
import React, { useState } from 'react'
import styles from './pPage.module.css'
import Prochain from './prochain/prochain'
import Nav from "../components/nav"
import Message from './message/message'
import Footer from '../components/footer'
import Image from 'next/image'



function PatPage() {
  const [selectedTab, setSelectedTab] = useState('prochain');
  
  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div>
      <Nav />
      <div className={styles.ctn}>
      <ul className={styles.liste}>
        <li className={styles.element}><h2 className={styles.h2}>Prochain rendez-vous</h2></li>
        <li className={styles.element}><h2 className={styles.h3}>Modifier rendez-vous</h2></li>
      </ul>
      
      <div className={styles.prochain}>
        <Prochain className={styles.pRdv}/>
        <Image 
              src="/img/DrWithScreen.png"
              alt="image medecin"
              width={450}
              height={360}
            />
      </div>
      <Message className={styles.message}/>
      </div>
     <Footer />
    </div>
  )
}

export default PatPage