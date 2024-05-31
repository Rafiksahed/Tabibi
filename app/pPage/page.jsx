"use client"
import React, { useState } from 'react'
import styles from './pPage.module.css'
import Prochain from './prochain/prochain'
import Nav from "../components/nav"
import Message from './message/messagePatient'
import Footer from '../components/footer'
import Image from 'next/image'



function PatPage() {


  return (
    <div>
      <Nav />
      <div className={styles.ctn}>
      
      <div className={styles.prochain}>
        <Prochain className={styles.pRdv}/>
        <Image 
              src="/img/DrWithScreen.png"
              alt="image medecin"
              width={450}
              height={360}
            />
      </div>
      </div>
      <h1 className={styles.msg}>Messagerie</h1>
      <Message className={styles.message}/>
      
     <Footer />
    </div>
  )
}

export default PatPage