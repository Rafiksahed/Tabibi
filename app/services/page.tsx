'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';
import Nav from '../components/nav';
import styles from './page.module.css';
import Image from 'next/image';

interface Doctor {
  name: string;
  speciality: string;
  location: string;
}

function Page() {

  const [selectedOption, setSelectedOption] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [myData, setMyData] = useState<Doctor[]>([]);

  const fetchdataOption = async (option: string) => {
    let url = 'http://localhost:3001/info';
    if (option !== 'all') {
      url += `?speciality=${option}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setMyData(data);
    console.log(data);
  };

  const fetchdataText = async (text: string) => {
    let url = 'http://localhost:3001/info';
    if (text.trim() !== '') {
      url += `?username=${text}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setMyData(data);
  };

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    setSelectedOption(option);
    await fetchdataOption(option);
  };

  const handleSearchSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);
    await fetchdataText(text);
  };

  useEffect(() => {
    fetchdataOption(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    fetchdataText(searchText);
  }, [searchText]);




  const goToProfile = () =>{
    window.location.href='/profile'
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
          <input type="text" placeholder='specialité , Nom' value={searchText} onChange={handleSearchSubmit} />
        </form>

        <select name="filter" id="" onChange={handleChange} value={selectedOption}>
          <option value="all">All</option>
          <option value="cardiologue">Cardiologue</option>
          <option value="dentiste">Dentiste</option>
          <option value="generaliste">Generaliste</option>
          <option value="orthopedics">Orthopedics</option>
        </select>
      </div>

      {/* Display data based on selected option */}
      <div>
        {myData.map((dataItem, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardContent}>
              <h3>{dataItem.username}</h3>
              <p>{dataItem.speciality}</p>
              <p>{dataItem.location}</p>
            </div>
            <button className={styles.orderButton}>Prenez rendez-vous</button>
            <button className={styles.detail} onClick={goToProfile}>Plus de détails</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
