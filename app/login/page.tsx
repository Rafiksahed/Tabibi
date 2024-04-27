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
import { useEffect } from 'react';




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




    // Define a variable to hold the login data
let loggedInUser = null;

const sendLoginData = async () => {
    const patientEmailInput = document.getElementById('patientEmail') as HTMLInputElement;
    const patientPasswordInput = document.getElementById('patientPassword') as HTMLInputElement;

    const patientEmail = patientEmailInput.value;
    const patientPassword = patientPasswordInput.value;

    try {
        const response = await fetch('http://localhost:3301/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: patientEmail,
                password: patientPassword
            })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const responseData = await response.json();
        // Save the user data in session storage
        sessionStorage.setItem('loggedInUser', JSON.stringify(responseData.username));
        console.log('Logged in user:', responseData.username);
        location.href = `./mPage/?username=${responseData.username}`;
        // Optionally, redirect the user to another page or perform other actions
    } catch (error) {
        console.error('Error logging in:', error.message);
    }
};

const sendLoginDataMedecin = async () => {
    const medecinEmailInput = document.getElementById('medecinEmail') as HTMLInputElement;
    const medecinPasswordInput = document.getElementById('medecinPassword') as HTMLInputElement;

    const medecinEmail = medecinEmailInput.value;
    const medecinPassword = medecinPasswordInput.value;

    try {
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: medecinEmail,
                password: medecinPassword
            })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const responseData = await response.json();
        // Save the user data in session storage
        sessionStorage.setItem('loggedInUser', JSON.stringify(responseData.user));
        console.log('Logged in user:', responseData.user);
        location.href = './';
        // Optionally, redirect the user to another page or perform other actions
    } catch (error) {
        console.error('Error logging in:', error.message);
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
        <div className={styles.bienvenue} id='bienvenue'>
            <div>
            <h2>vous avez un medecin!</h2>
            <p>si vous etes un medecin tu peux inscrir comme un medecin et travaillez avec nous 
                et gagnez l'argent tous simplement </p>

                <button onClick={trans}> Connecter tant que medecin </button>
            </div>
        </div>
        <div className={styles.myloginpage}>
            <center>
        <div className={styles.description}>
        <h1> Bonjour a tabibi </h1>
        <p>  le premier platform pour mettre rendez vous online dans l'algerie</p>
        </div>
    <div>
    <label htmlFor="email"><MdEmail /></label>
    <input type="email" id='patientEmail' placeholder='email' />
</div>
<div>
    <label htmlFor="password"><FaLock /></label>
    <input type="password" id='patientPassword' placeholder='mot de pass' />
</div>
<h5 className={styles.oublier} onClick={choix}>vous aver oublier votre mot de pass ?</h5>
<h5>vous aver pas un compte ? <Link href="/inscrire">S'inscrire</Link></h5>

<button onClick={sendLoginData}> Connection </button>

</center>
</div>

    </div>






{/* this is for medecin */}


    <div className={styles.medecinmain} id='medecinmain'>
        <div className={styles.myloginpage} id='choix'>
            <center>
        <div className={styles.description}>
        <h1> Bonjour a tabibi </h1>
        <p>  le premier platform pour mettre rendez vous online dans l'algerie </p>
        </div>

<div>
    <label htmlFor="email"><MdEmail /></label>
    <input type="email" id='medecinEmail' placeholder='email' />
</div>

<div>
    <label htmlFor="password"><FaLock /></label>
    <input type="password" id='medecinPassword' placeholder='mot de pass' />
</div>

<h5 className={styles.oublier} onClick={choix}>vous aver oublier votre mot de pass ?</h5>
<h5>vous aver pas un compte ? <Link href="/inscrire">S'inscrire</Link></h5>

<button onClick={sendLoginDataMedecin}> connection </button>

</center>
</div>

<div className={styles.specialitepage} id='specialitepage'>
<div>
    <center>
        
<h1> Bonjour a tabibi </h1>
        <p>  s'il vous plait choisi votre specialite </p>
        </center>
</div>
<div className={styles.specialite}>
    <button className={styles.card}>Cardiologue</button>
    <button className={styles.card}>Dermatology</button>
    <button className={styles.card}>Orthopedics </button>
    <button className={styles.card}>Gastroenterology</button>
    <button className={styles.card}>Ophthalmology</button>
    <button className={styles.card}>Obstetrics and Gynecology</button>
    <button className={styles.card}>Pediatrics</button>
    <button className={styles.card}>Psychiatry</button>
    <button className={styles.card}>Oncology</button>
    <button className={styles.card}>Dentiste</button>
    <button className={styles.card}>generaliste</button>
    <button className={styles.card}>Psychiatre</button>
    <button className={styles.connect}> S'inscrire </button>
    <button className={styles.return} onClick={nonchoix}><IoMdReturnLeft /></button>
</div>
</div>

<div className={styles.bienvenue} id='bienvenue'>
            <div>
            <h2>vous avez un patient!</h2>
            <p>si vous etez un patient tu peux inscrir pour prenez un consultaion online  </p>

                <button onClick={trans2}> Connecter tant que patient </button>
            </div>
        </div>

    </div>
    </div>
  )
}

export default page