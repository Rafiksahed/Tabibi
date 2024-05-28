"use client"

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

interface User {
    doctor_id: number;
    patient_id: number;
    appointment_id: number;
  user_id: number;
  username: string;
  email: string;
  phone_number: string;
  speciality: string;
  date_time: string;
  status: string;
  // Define other properties here
}

function Page() {
  const [data, setData] = useState<User[]>([]);
  const [dataMedecin, setDataMedecin] = useState<User[]>([]);
  const [dataMedecinStatus, setDataMedecinStatus] = useState<User[]>([]);
  const [dataPatient, setDataPatient] = useState<User[]>([]);
  const [dataAppointement, setDataAppointement] = useState<User[]>([]);


  
  useEffect(() => {
    fetchData();
    fetchDataMedecin();
    fetchDataMedecinStatus();
    fetchDataPatient();
    fetchDataAppointement();
  }, []);

  const [select, setSelect] = useState('users')


  let specChoice: string;

  const spec = (choice: string) => {
      specChoice = choice; // Set the specChoice variable to the chosen specialization
      setSelect(choice);
      return choice;
  }
  console.log(select);
  const fetchData = async () => {
    try {
      const url = 'http://localhost:3001/api/adminPanel';
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await res.json();
      setData(jsonData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchDataMedecin = async () => {
    try {
      const url = 'http://localhost:3001/api/adminPanelMedecin';
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonDataMedecin = await res.json();
      setDataMedecin(jsonDataMedecin.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchDataMedecinStatus = async () => {
    try {
      const url = 'http://localhost:3001/api/adminPanelMedecinStatus';
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonDataMedecin = await res.json();
      setDataMedecinStatus(jsonDataMedecin.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataPatient = async () => {
    try {
      const url = 'http://localhost:3001/api/adminPanelPatient';
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonDataPatient = await res.json();
      setDataPatient(jsonDataPatient.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchDataAppointement = async () => {
    try {
      const url = 'http://localhost:3001/api/adminPanelAppointement';
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonDataAppointement = await res.json();
      setDataAppointement(jsonDataAppointement.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log(dataMedecin);
  }, [dataMedecin]);
  useEffect(() => {
    console.log(dataMedecinStatus);
  }, [dataMedecinStatus]);
  useEffect(() => {
    console.log(dataPatient);
  }, [dataPatient]);
  useEffect(() => {
    console.log(dataAppointement);
  }, [dataAppointement]);


  const block = async (userId: number) => {
    console.log(`Blocking user with ID: ${userId}`);
    const user_id = userId;
    location.reload();
    
    try {
      const response = await fetch('http://localhost:3001/api/deleteUser', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id
        })
      });
      
  
      if (!response.ok) {
        throw new Error('Failed to block user');
      }
  
      const responseData = await response.json();
      console.log('User blocked successfully:', responseData);
      // Optionally, perform any additional actions after blocking the user
      
  
    } catch (error) {
      console.error('Error blocking user:', error);
      // Optionally, provide feedback to the user about the error
    }
  };


  const accepted = async (userId: number) => {
    console.log(`Blocking user with ID: ${userId}`);
    const user_id = userId;
    location.reload();
    
    try {
      const response = await fetch('http://localhost:3001/api/adminAcceptMedecin', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id
        })
      });
      
  
      if (!response.ok) {
        throw new Error('accepted');
      }
  
      const responseData = await response.json();
      console.log('User accepted successfully:', responseData);
      // Optionally, perform any additional actions after blocking the user
      
  
    } catch (error) {
      console.error('Error accepting user:', error);
      // Optionally, provide feedback to the user about the error
    }
  };
  

  return (
    <div>
      <div className={styles.sideBar}>
        <h3>Admin</h3>
        <ul>
          <li>
            <Link href="" onClick={() => spec('users')}>Users</Link>
          </li>
          <li>
            <Link href="" onClick={() => spec('medecin')}>Medecin</Link>
          </li>
          <li>
            <Link href="" onClick={() => spec('patient')}>Patient</Link>
          </li>
          <li>
            <Link href="" onClick={() => spec('rendz')}>Rendez Vous</Link>
          </li>
          <li>
            <Link href="" onClick={() => spec('aprove')}>Aprove Medecin</Link>
          </li>
        </ul>
      </div>

{select == "users" && (

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>phone number</th>
            <th>block</th>
            {/* Add more headers as per your data structure */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.user_id}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.phone_number}</td>
              <td><button onClick={() => block(item.user_id)}>block user</button></td>
              {/* Render other data fields here */}
            </tr>
          ))}
        </tbody>
      </table>
       )}



       
{select == "medecin" && (

<table className={styles.table}>
  <thead>
    <tr>
      <th>doctor_id</th>
      <th>user_id</th>
      <th>username</th>
      <th>speciality</th>
      <th>block</th>
      {/* Add more headers as per your data structure */}
    </tr>
  </thead>
  <tbody>
    {dataMedecin.map((item, index) => (
      <tr key={index}>
        <td>{item.doctor_id}</td>
        <td>{item.user_id}</td>
        <td>{item.username}</td>
        <td>{item.speciality}</td>
        <td><button onClick={() => block(item.user_id)}>block user</button></td>
        {/* Render other data fields here */}
      </tr>
    ))}
  </tbody>
</table>
 )}


{select == "patient" && (

<table className={styles.table}>
  <thead>
    <tr>
      <th>patient_id</th>
      <th>user_id</th>
      <th>username</th>
      <th>block</th>
      {/* Add more headers as per your data structure */}
    </tr>
  </thead>
  <tbody>
    {dataPatient.map((item, index) => (
      <tr key={index}>
        <td>{item.patient_id}</td>
        <td>{item.user_id}</td>
        <td>{item.username}</td>
        <td><button onClick={() => block(item.user_id)}>block user</button></td>
        {/* Render other data fields here */}
      </tr>
    ))}
  </tbody>
</table>
 )}




 
{select == "rendz" && (

<table className={styles.table}>
  <thead>
    <tr>
      <th>APPOINTMENT ID</th>
      <th>DOCTOR ID</th>
      <th>PATIENT ID</th>
      <th>DATE TIME</th>
      <th>STATUS</th>
      {/* Add more headers as per your data structure */}
    </tr>
  </thead>
  <tbody>
    {dataAppointement.map((item, index) => (
      <tr key={index}>
        <td>{item.appointment_id}</td>
        <td>{item.doctor_id}</td>
        <td>{item.patient_id}</td>
        <td>{item.date_time}</td>
        <td>{item.status}</td>
        {/* Render other data fields here */}
      </tr>
    ))}
  </tbody>
</table>
 )}




 
{select == "aprove" && (

<table className={styles.table}>
  <thead>
    <tr>
      <th>doctor_id</th>
      <th>user_id</th>
      <th>username</th>
      <th>speciality</th>
      <th>status</th>
      {/* Add more headers as per your data structure */}
    </tr>
  </thead>
  <tbody>
    {dataMedecinStatus.map((item, index) => (
      <tr key={index}>
        <td>{item.doctor_id}</td>
        <td>{item.user_id}</td>
        <td>{item.username}</td>
        <td>{item.speciality}</td>
        <td>{item.status}</td>
        <td><button onClick={() => accepted(item.user_id)} className={styles.accepted}>Accepte</button></td>
        <td><button onClick={() => block(item.user_id)}>refuse</button></td>
        {/* Render other data fields here */}
      </tr>
    ))}
  </tbody>
</table>
 )}

    </div>
  );
}

export default Page;
