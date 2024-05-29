"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './info.css';
import anes from '../../../public/photo1678456791.jpeg';
import { FaUserDoctor } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";

interface User {
  doctor_id: number;
  patient_id: number;
  appointment_id: number;
  user_id: number;
  username: string;
  ville: string;
  adresse: string;
  email: string;
  phone_number: string;
  speciality: string;
  date_time: string;
  status: string;
}

function Info() {
  const [data, setData] = useState<User[]>([]);
  const [select, setSelect] = useState(1);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/fetchinfo', {
        credentials: 'include' // Include credentials if necessary
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await res.json();
      setData(jsonData.profiledata); // Assuming the endpoint returns an object with profiledata
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []); // Empty dependency array means this effect runs only once after the initial render

  useEffect(() => {
    console.log(data); // Log data whenever it changes
  }, [data]); // Run this effect whenever data changes

  const handleSelect = (selection: number, buttonIds: string[]) => {
    setSelect(selection);
    buttonIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.backgroundColor = selection.toString() === id.slice(-1) ? '#022550' : 'transparent';
        element.style.color = selection.toString() === id.slice(-1) ? '#e6e6e6' : '#252525';
      }
    });
  };

  return (
    <div>
      <div className='des'>
        <ul>
          <li><button onClick={() => handleSelect(1, ['one', 'two', 'four'])} id='one'>Profile</button></li>
        </ul>
      </div>
      <div className='all'>
        <div className='info'>
          {select === 1 && (
            <div className='patientInfo'>
              <ul>
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                    <li key={index}>
                      <ul>
                        <li>
                          <span>nom et prenom:</span>
                          <span className='information'> {item.username} </span>
                        </li>
                        <li>
                          <span>speciality:</span>
                          <span className='information'> {item.speciality} </span>
                        </li>
                        <li>
                          <span>adress:</span>
                          <span className='information'> {item.ville} {item.adresse} </span>
                        </li>
                        <li>
                          <span>numero de telephone:</span>
                          <span className='information'> {item.phone_number} </span>
                        </li>
                        <li>
                          <span>email:</span>
                          <span className='information'> {item.email} </span>
                        </li>
                      </ul>
                    </li>
                  ))
                ) : (
                  <li>No data available</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Info;
