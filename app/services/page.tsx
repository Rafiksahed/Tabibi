'use client'

import React, { useState } from 'react';
import Nav from '../components/nav';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

function Page() {
  const [selectedOption, setSelectedOption] = useState('all');
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    
  };
  const handleSearchSubmit = (event) => {
    setSearchText(event.target.value);
  };

  const goToProfile =()=>{
    window.location.href = '/profile'
  }


  return (
    <div>
      <Nav />
      
      <div className={styles.form}>

      <form action="">
            <label htmlFor="">
            <Image 
              src="/img/searchIcon.png"
              alt='search icon'
              width={30}
              height={30}
            />
            </label>
            <input type="text" placeholder='specialité , Nom' onChange={handleSearchSubmit}/>
           </form>


        <select name="filter" id="" onChange={handleChange}>
          <option value="all">All</option>
          <option value="Cardiologue">Cardiologue</option>
          <option value="Dentiste">Dentiste</option>
          <option value="Generaliste">Generaliste</option>
          <option value="Orthopedics">Orthopedics</option>
        </select>
        
      </div>




      {selectedOption === 'all' && (


        <div>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h3>Rafik sahed</h3>
          <p>Cardiologue</p>
          <p>Blida</p>
        </div>
        <button className={styles.orderButton}>Prenez rendez-vous</button>
        <button className={styles.detail} onClick={goToProfile}>Plus de détails</button>
      </div>

      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h3>Anes amrane</h3>
          <p>Generaliste</p>
          <p>Blida</p>
        </div>
        <button className={styles.orderButton}>Prenez rendez-vous</button>
        <button className={styles.detail} onClick={goToProfile}>Plus de détails</button>
      </div>

      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h3>Kacem yacine djeghab</h3>
          <p>Dentiste</p>
          <p>Blida</p>
        </div>
        <button className={styles.orderButton}>Prenez rendez-vous</button>
        <button className={styles.detail} onClick={goToProfile}>Plus de détails</button>
      </div>

      </div>

    )}








      {selectedOption === 'Cardiologue' && (


<div className={styles.card}>
        <div className={styles.cardContent}>
          <h3>Rafik sahed</h3>
          <p>Cardiologue</p>
          <p>Blida</p>
        </div>
        <button className={styles.orderButton}>Prenez rendez-vous</button>
        <button className={styles.detail} onClick={goToProfile}>Plus de détails</button>
      </div>

)}


{selectedOption === 'Generaliste' && (


<div className={styles.card}>
<div className={styles.cardContent}>
  <h3>Anes amrane</h3>
  <p>Generaliste</p>
  <p>Blida</p>
</div>
<button className={styles.orderButton}>Prenez rendez-vous</button>
<button className={styles.detail} onClick={goToProfile}>Plus de détails</button>
</div>

)}



{selectedOption === 'Dentiste' && (


<div className={styles.card}>
        <div className={styles.cardContent}>
          <h3>Kacem yacine djeghab</h3>
          <p>Dentiste</p>
          <p>Blida</p>
        </div>
        <button className={styles.orderButton}>Prenez rendez-vous</button>
        <button className={styles.detail} onClick={goToProfile}>Plus de détails</button>
      </div>


)}

    </div>
  );
}

export default Page;
