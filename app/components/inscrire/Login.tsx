'use client'

/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Link from 'next/link'
import './login.css'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdBloodtype } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";
import { FaLock } from "react-icons/fa";


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
        const specialitepage = document.querySelector('.specialitepage') as HTMLElement | null;
        const myloginpage = document.getElementById('choix');

        if(myloginpage)
        myloginpage.style.bottom = '100%';
        if(specialitepage)
        specialitepage.style.top = '0%';
    }

    
    const nonchoix = () =>{
        const specialitepage = document.querySelector('.specialitepage') as HTMLElement | null;
        const myloginpage = document.getElementById('choix');

        if(myloginpage)
        myloginpage.style.bottom = '0%';
        if(specialitepage)
        specialitepage.style.top = '100%';
    }
    




function Login() {
  return (
    <div className='allmain'>


        {/* this is for patient */}  

    <div className='patientmain' id='patientmain'>
        <div className='bienvenue' id='bienvenue'>
            <div>
            <h2>vous avez un medecin!</h2>
            <p>si vous etes un medecin tu peux inscrir comme un medecin et travaillez avec nous 
                et gagnez l'argent tous simplement </p>

                <button onClick={trans}> S'inscrire tant que medecin </button>
            </div>
        </div>
        <div className='myloginpage'>
            <center>
        <div className='description'>
        <h1> Bonjour a tabibi </h1>
        <p>  le premier platform pour mettre rendez vous online dans l'algerie</p>
        </div>
    <div>
        <label htmlFor="name"><FaUser /></label>
        <input type="text" id='name' placeholder='le nom et le prenom' />
    </div>

    <div>
    <label htmlFor="number"><FaPhoneAlt /></label>
    <input type="number" id='number' placeholder='number' />
</div>

<div>
    <label htmlFor="email"><MdEmail /></label>
    <input type="email" id='email' placeholder='email' />
</div>

<div>
    <label htmlFor="password"><FaLock /></label>
    <input type="password" id='password' placeholder='mot de pass' />
</div>


<div>
    <label htmlFor="confirmpassword"><FaLock /></label>
    <input type="password" id='confirmpassword' placeholder='confirmez votre mot de pass' />
</div>


<h5>vous avez deja un compte ? <Link href="/login">connecter</Link></h5>

<button> S'inscrire </button>

</center>
</div>

    </div>






{/* this is for medecin */}


    <div className='medecinmain' id='medecinmain'>
        <div className='myloginpage' id='choix'>
            <center>
        <div className='description'>
        <h1> Bonjour a tabibi </h1>
        <p>  le premier platform pour mettre rendez vous online dans l'algerie </p>
        </div>
    <div>
        <label htmlFor="name"><FaUser /></label>
        <input type="text" id='name' placeholder='le nom et le prenom' />
    </div>

<div>
    <label htmlFor="number"><FaPhoneAlt /></label>
    <input type="number" id='number' placeholder='number' />
</div>

<div>
    <label htmlFor="email"><MdEmail /></label>
    <input type="email" id='email' placeholder='email' />
</div>

<div>
    <label htmlFor="password"><MdBloodtype /></label>
    <input type="password" id='password' placeholder='mot de pass' />
</div>


<div>
    <label htmlFor="password"><MdBloodtype /></label>
    <input type="password" id='password2' placeholder='confirmez votre mot de pass' />
</div>

<h5>vous avez deja un compte ? <Link href="/login">connecter</Link></h5>

<button onClick={choix}> Continue </button>

</center>
</div>

<div className='specialitepage'>
<div>
    <center>
        
<h1> Bonjour a tabibi </h1>
        <p>  s'il vous plait choisi votre specialite </p>
        </center>
</div>
<div className='specialite'>
    <button className='card'>Cardiologue</button>
    <button className='card'>Dermatology</button>
    <button className='card'>Orthopedics </button>
    <button className='card'>Gastroenterology</button>
    <button className='card'>Ophthalmology</button>
    <button className='card'>Obstetrics and Gynecology</button>
    <button className='card'>Pediatrics</button>
    <button className='card'>Psychiatry</button>
    <button className='card'>Oncology</button>
    <button className='card'>Dentiste</button>
    <button className='card'>generaliste</button>
    <button className='card'>Psychiatre</button>
    <button className='connect'> S'inscrire </button>
    <button className='return' onClick={nonchoix}><IoMdReturnLeft /></button>
</div>
</div>

<div className='bienvenue' id='bienvenue'>
            <div>
            <h2>vous avez un patient!</h2>
            <p>si vous etez un patient tu peux inscrir pour prenez un consultaion online  </p>

                <button onClick={trans2}> S'inscrire tant que patient </button>
            </div>
        </div>

    </div>
    </div>
  )
}

export default Login