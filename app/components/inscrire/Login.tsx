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
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdHolidayVillage } from "react-icons/md";
import { MdCabin } from "react-icons/md";
import Swal from 'sweetalert2';


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

    const choix = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
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

    const [wrong, setWrong] = useState(false);
    const [confPass, setConfPass] = useState(true);
    
    const sendRegistreDataPatient = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const patientNameInput = document.getElementById('patientName') as HTMLInputElement;
        const patientNumberInput = document.getElementById('patientNumber') as HTMLInputElement;
        const patientEmailInput = document.getElementById('patientEmail') as HTMLInputElement;
        const patientPasswordInput = document.getElementById('patientPassword') as HTMLInputElement;
        const confirmPatientPasswordInput = document.getElementById('patientConfirmpassword') as HTMLInputElement;
    
        const patientName = patientNameInput.value;
        const patientNumber = patientNumberInput.value;
        const patientEmail = patientEmailInput.value;
        const patientPassword = patientPasswordInput.value;
        const confirmPatientPassword = confirmPatientPasswordInput.value;
    
    
        if (patientName !== '' && patientEmail !== '' && patientPassword !== '' && patientNumber !== '') {
            if (confirmPatientPassword === patientPassword) {
                try {
                    const response = await fetch('http://localhost:3001/api/registre', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: patientName,
                            number: patientNumber,
                            email: patientEmail,
                            password: patientPassword,
                        })
                    });
    
                    if (!response.ok) {
                        throw new Error('Failed to register');
                    } 
    
                    const responseData = await response.json();
                    // Save the user data in session storage
                    sessionStorage.setItem('loggedInUser', JSON.stringify(responseData.user));
                    console.log('Logged in user:', responseData.user);
                    location.href = `./pPage/?username=${responseData.user}`;

                    
                    // Optionally, redirect the user to another page or perform other actions
                } catch (error) {
                    console.error('Error registering:', error);
                    setWrong(true)
                }
            } else {
                // Passwords don't match
                setConfPass(false)
            }
        } else {
            alert('All fields are mandatory');
        }
    };
    

    let specChoice: string;

const spec = (choice: string) => {
    console.log(choice);
    specChoice = choice; // Set the specChoice variable to the chosen specialization
    return choice;
}

const showAlert = () => {
    Swal.fire({
        title: 'votre compte est cree',
      text: 'i faut attend 24 heur pour confirmer votre inscription',
      icon: 'success',
      confirmButtonText: 'ok'
    });
  };
const sendRegistreDataMedecin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const medecinNameInput = document.getElementById('medecinName') as HTMLInputElement;
    const medecinNumberInput = document.getElementById('medecinNumber') as HTMLInputElement;
    const medecinEmailInput = document.getElementById('medecinEmail') as HTMLInputElement;
    const medecinPasswordInput = document.getElementById('medecinPassword') as HTMLInputElement;
    const confirmmedecinPasswordInput = document.getElementById('medecinConfirmpassword') as HTMLInputElement;
    const villeInput = document.getElementById('ville') as HTMLInputElement;
    const adresseInput = document.getElementById('adresse') as HTMLInputElement;

    const medecinName = medecinNameInput.value;
    const medecinNumber = medecinNumberInput.value;
    const medecinEmail = medecinEmailInput.value;
    const medecinPassword = medecinPasswordInput.value;
    const confirmmedecinPassword = confirmmedecinPasswordInput.value;
    const ville = villeInput.value;
    const adresse = adresseInput.value;
    

    let specValue = specChoice; // Pass your choice as an argument here

    if (medecinName !== '' && medecinEmail !== '' && medecinPassword !== '' && medecinNumber !== ''
     && ville !== '' && adresse !== '') {
        if (confirmmedecinPassword === medecinPassword) {
            try {
                const response = await fetch('http://localhost:3001/api/registreMedecin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: medecinName,
                        number: medecinNumber,
                        email: medecinEmail,
                        password: medecinPassword,
                        spec: specValue, // Pass spec value here if needed
                        ville: ville,
                        adresse: adresse,
                    })
                });

                if (!response.ok) {
                    setWrong(true)
                    throw new Error('Failed to register');
                } 

                const responseData = await response.json();
                // Save the user data in session storage
                sessionStorage.setItem('loggedInUser', JSON.stringify(responseData.user));
                console.log('Logged in user:', responseData.user);
                Swal.fire({
                    title: 'bonjour a tabibi',
                    text: 'il faut attend 24 heure pour accepter votre demande',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Perform the action you want when OK is clicked
                      location.href = `./pPage/?username=${responseData.user}`;
                    }
                  });
                // Optionally, redirect the user to another page or perform other actions
            } catch (error) {
                console.error('Error registering:', error);
                setWrong(true)
            }
        } else {
            setConfPass(false)
        }
    } else {
        alert('All fields are mandatory');
    }
};



  return (
    <div className='allmain'>


        {/* this is for patient */}  

    <div className='patientmain' id='patientmain'>
    <div className="logo">
        <Link href='/'>
        <Image 
                          src="/img/logoT.png"
                          width={130}
                          height={50} alt={''}        />
        </Link>
        </div>
        <div className='bienvenue' id='bienvenue'>
            <div>
            <h2>Vous etes medecin !</h2>
            <p>si vous etes un medecin vous pouvez vous inscrire ici </p>

                <button onClick={trans}> S'inscrire en tant que medecin </button>
            </div>
        </div>
        <form className='myloginpage'>
            <center>
        <div className='description'>
        <h1> Inscription </h1>
        <p>  Platform de gestion de rendez vous medicaux en ligne</p>
        </div>
    <div>
        <label htmlFor="name"><FaUser /></label>
        <input type="text" id='patientName' placeholder='le nom et le prenom' />
    </div>

    <div>
    <label htmlFor="number"><FaPhoneAlt /></label>
    <input type="number" id='patientNumber' placeholder='number' />
</div>

<div>
    <label htmlFor="email"><MdEmail /></label>
    <input type="email" id='patientEmail' placeholder='email' />
</div>

<div>
    <label htmlFor="password"><FaLock /></label>
    <input type="password" id='patientPassword' placeholder='mot de pass' />
</div>


<div>
    <label htmlFor="confirmpassword"><FaLock /></label>
    <input type="password" id='patientConfirmpassword' placeholder='confirmez votre mot de pass' />
</div>
{wrong == true &&
<h5 className="wrong">username ou bien l'email deja exist.</h5>
}
{confPass == false &&
<h5 className="wrong">Les mots de passe ne correspondent pas.</h5>
}


<h5>vous avez deja un compte ? <Link href="/login">se connecter</Link></h5>

<button onClick={sendRegistreDataPatient}> S'inscrire </button>

</center>
</form>

    </div>






{/* this is for medecin */}


    <div className='medecinmain' id='medecinmain'>
    <div className="logo2">
        <Link href='/'>
        <Image 
                          src="/img/logoT.png"
                          width={130}
                          height={50} alt={''}        />
        </Link>
        </div>
        <form className='myloginpage' id='choix'>
            <center>
        <div className='description'>
        <h1> S'inscrire </h1>
        <p>   Platform de gestion de rendez vous medicaux en ligne</p>
        </div>
    <div>
        <label htmlFor="name"><FaUser /></label>
        <input type="text" id='medecinName' placeholder='le nom et le prenom' />
    </div>

<div>
    <label htmlFor="number"><FaPhoneAlt /></label>
    <input type="number" id='medecinNumber' placeholder='number' />
</div>

<div>
    <label htmlFor="email"><MdEmail /></label>
    <input type="email" id='medecinEmail' placeholder='email' />
</div>

<div>
    <label htmlFor="password"><FaLock /></label>
    <input type="password" id='medecinPassword' placeholder='mot de pass' />
</div>


<div>
    <label htmlFor="password"><FaLock /></label>
    <input type="password" id='medecinConfirmpassword' placeholder='confirmez votre mot de pass' />
</div>
<div className='ville'>
<label htmlFor="password"><MdHolidayVillage /></label>
    <input type="text" id='ville' placeholder='votre ville' />
</div>
<div className='adresse'>
<label htmlFor="password"><MdCabin /></label>
    <input type="text" id='adresse' placeholder='votre adresse' />
</div>
{wrong == true &&
<h5 className="wrong">username ou bien l'email deja exist</h5>
}
{confPass == false &&
<h5 className="wrong">Les mots de passe ne correspondent pas.</h5>
}


<h5>vous avez deja un compte ? <Link href="/login">connecter</Link></h5>

<button onClick={choix}> Continue </button>

</center>
</form>

<div className='specialitepage'>
<div>
    <center>
        
<h1>Specialité</h1>
        <p>  choisissez votre specialité </p>
        </center>
</div>
<div className='specialite'>
<button className='card' onClick={() => spec('Cardiologue')}>Cardiologue</button>
    <button className='card' onClick={() => spec('Dermatologue')}>Dermatologue</button>
    <button className='card' onClick={() => spec('Orthopedique')}>Orthopedique </button>
    <button className='card' onClick={() => spec('Gastrologue')}>Gastrologue</button>
    <button className='card' onClick={() => spec('Ophthalmologue')}>Ophthalmologue</button>
    <button className='card' onClick={() => spec('Gynecologue')}>Gynecologue</button>
    <button className='card' onClick={() => spec('Pediatre')}>Pediatre</button>
    <button className='card' onClick={() => spec('Oncologue')}>Oncologue</button>
    <button className='card' onClick={() => spec('Dentiste')}>Dentiste</button>
    <button className='card' onClick={() => spec('Generaliste')}>Generaliste</button>
    <button className='card' onClick={() => spec('Psychiatre')}>Psychiatre</button>
    <button className='connect' onClick={sendRegistreDataMedecin}> S'inscrire </button>
    <button className='return' onClick={nonchoix}><IoMdReturnLeft /></button>
</div>
</div>

<div className='bienvenue' id='bienvenue'>
            <div>
            <h2>vous chercher un rendez vous ?</h2>
            <p>si vous chercher un rendez vous inscrivez vous maintenant </p>

                <button onClick={trans2}> S'inscrire</button>
            </div>
        </div>

    </div>
    </div>
  )
}

export default Login