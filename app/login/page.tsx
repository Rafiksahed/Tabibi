
"use client"


/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdBloodtype } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Image from 'next/image';





const trans =() =>{
    const patientmain = document.getElementById('patientmain');
    const medecinmain = document.getElementById('medecinmain');
    if (patientmain){
        if (medecinmain){
            {/*
    patientmain.style.opacity = '1'
    patientmain.style.transition = '0.5s'
    patientmain.style.zIndex = '1'
    medecinmain.style.opacity = '0'
    medecinmain.style.zIndex = '0'
    */}
    medecinmain.style.transform = 'translateX(0%)';
    medecinmain.style.transition = '0.5s';
    patientmain.style.transform = 'translateX(-100%)';
    patientmain.style.transition = '0.5s';
    }
}
    }



const trans2 =() =>{
    const patientmain = document.getElementById('patientmain');
    const medecinmain = document.getElementById('medecinmain');
    if (patientmain){
        if (medecinmain){
            {/*
        medecinmain.style.opacity = '1'
        medecinmain.style.transition = '0.5s'
        medecinmain.style.zIndex = '1'
        patientmain.style.opacity = '0'
        patientmain.style.zIndex = '0'
        */}
    patientmain.style.transform = 'translateX(0%)';
    patientmain.style.transition = '0.5s';
    medecinmain.style.transform = 'translateX(100%)';
    medecinmain.style.transition = '0.5s';
    }
}
    }

    const choix = () =>{
        const specialitepage = document.getElementById('specialitepage');
        const myloginpage = document.getElementById('choix');

        if(myloginpage)
        myloginpage.style.bottom = '100%';
        if(specialitepage)
        specialitepage.style.top = '0%';
    }

    
    const nonchoix = () =>{
        const specialitepage = document.getElementById('specialitepage');
        const myloginpage = document.getElementById('choix');

        if(myloginpage)
        myloginpage.style.bottom = '0%';
        if(specialitepage)
        specialitepage.style.top = '100%';
    }
    




function page() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [wrong, setWrong] = useState(false);


    // Define a variable to hold the login data
let loggedInUser = null;

const sendLoginData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const patientEmailInput = document.getElementById('patientEmail');
    const patientPasswordInput = document.getElementById('patientPassword');

    const patientEmail = patientEmailInput.value;
    const patientPassword = patientPasswordInput.value;

 
    try {
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: patientEmail,
                password: patientPassword
            }),
            credentials: 'include' // Assurez-vous que cela est inclus pour gérer les sessions avec cookies
        });

        if (!response.ok) {
            throw new Error('Failed to login');
            
        }

        const responseData = await response.json();
        // Redirection en fonction du type d'utilisateur
        console.log(responseData.username)
        if (responseData.username === 'admin') {
            window.location.href = `/admin?user_name=${responseData.username}`;
        } else if (responseData.userType === 'medecin') {
            window.location.href = `/mPage?user_name=${responseData.username}`;
        } else if (responseData.userType === 'patient') {
            window.location.href = `/pPage?user_name=${responseData.username}`;
        } else {
            console.error('Invalid user type');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        setWrong(true)
    }
};

    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        document.body.style.overflow = "hidden"; // Or your desired DOM manipulation
      }, []);
    
    
  return (
    <div className={styles.allmain}>


        {/* this is for patient */}  

    <div className={styles.patientmain} id='patientmain'>
    <div className={styles.logo}>
        <Link href='/'>
        <Image 
                          src="/img/logoT.png"
                          width={130}
                          height={50} alt={''}        />
        </Link>
        </div>
        <div className={styles.bienvenue} id='bienvenue'>
            
            <div>
            <h2>Tabibi ,</h2>
            <p>votre solution de prise de rendez-vous médicaux en ligne ! </p>

            </div>
        </div>
        <form className={styles.myloginpage}>
            <center>
        <div className={styles.description}>
        <h1> se connecter </h1>
        <p> à la platform de gestion de rendez vous medicaux en ligne</p>
        </div>
    <div>
    <label htmlFor="email"><MdEmail /></label>
    <input type="email" id='patientEmail' placeholder='email' />
</div>
<div>
    <label htmlFor="password"><FaLock /></label>
    <input type="password" id='patientPassword' placeholder='mot de pass' />
</div>
{wrong == true &&
<h5 className={styles.wrong}>L'email ou le mot de passe est incorrect.</h5>
}
<h5>vous aver pas un compte ? <Link href="/inscrire">S'inscrire</Link></h5>

<button onClick={sendLoginData}> Connection </button>

</center>
</form>

    </div>





    </div>
  )
}

export default page
