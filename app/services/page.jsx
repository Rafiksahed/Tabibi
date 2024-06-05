'use client';

import React, { useState, useEffect } from 'react';
import Nav from '../components/nav';
import styles from './page.module.css';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HiChevronUpDown } from "react-icons/hi2";
import Link from 'next/link';
import Swal from 'sweetalert2';

function Page() {
  const [doctors, setDoctors] = useState([]);
  const [type, setType] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [error, setError] = useState('');

  const fetchDoctors = async () => {
    const res = await fetch('http://localhost:3001/api/services');
    const data = await res.json();
    setDoctors(data.doctors);
    setFilteredDoctors(data.doctors);
  };

  const userType = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/userType');
      const data = await res.json();
      setType(data);
      console.log(data);
      console.log(data.userType);
  
      if (data.userType === 'medecin') {
        Swal.fire({
          text: 'Il faut créer un compte patient pour prendre un rendez-vous',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error fetching user type:', error);
    }
  };
  

  const fetchAppointments = async (doctorId) => {
    const res = await fetch(`http://localhost:3001/api/rdvServices?doctorId=${doctorId}`);
    const data = await res.json();
    setAppointments(data.appointments);
  };

  const handleFilterChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    applyFilters(option, searchText);
  };

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    applyFilters(selectedOption, text);
  };

  const applyFilters = (option, text) => {
    let filteredData = doctors;

    if (option !== 'all') {
      filteredData = filteredData.filter((doctor) => doctor.speciality && doctor.speciality.toLowerCase() === option.toLowerCase());
    }

    if (text.trim() !== '') {
      filteredData = filteredData.filter((doctor) => doctor.ville && doctor.ville.toLowerCase().includes(text.toLowerCase()));
    }

    setFilteredDoctors(filteredData);
    console.log(filteredData);
    console.log("zbal w 5lasses");
  };

  const bookAppointment = async (doctorId, selectedDate, selectedTime) => {
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time');
      return;
    }

    const dateTime = new Date(selectedDate);
    const [hour, minute] = selectedTime.split(':');

    if (isNaN(hour) || isNaN(minute)) {
      setError('Invalid time format');
      return;
    }

    dateTime.setHours(hour, minute, 0, 0);

    // Adjust for timezone offset
    const offset = dateTime.getTimezoneOffset();
    dateTime.setMinutes(dateTime.getMinutes() - offset);

    if (isNaN(dateTime.getTime())) {
      setError('Invalid date or time');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/rdvServices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include credentials for session-based authentication
        body: JSON.stringify({
          doctor_id: doctorId,
          date_time: dateTime.toISOString().slice(0, 19).replace('T', ' ')
        })
      });

      const data = await res.json();
      if (data.success) {
        await fetchAppointments(doctorId); // Rafraîchir les rendez-vous
        Swal.fire({
          text: 'Appointment booked successfully!',
          icon: 'success',
          confirmButtonText: 'ok'
        });

        setError(''); // Réinitialiser les erreurs après le succès
      } else {
        setError('Failed to book appointment: ' + data.message);
      }
    } catch (error) {
      setError('Failed to book appointment: ' + error.message);
    }
  };

  const showAlert = () => {
    Swal.fire({
      text: 'il faut cree un compte patient pou prendre un rendez vouz',
      confirmButtonText: 'ok'
    });
  };


  useEffect(() => {
    fetchDoctors();
  }, []);
  useEffect(() => {
    userType();
  }, []);
  useEffect(() => {
    if (selectedDoctorId) {
      fetchAppointments(selectedDoctorId);
    }
  }, [selectedDoctorId]);

  useEffect(() => {
    if (selectedDate) {
      const slots = generateAvailableTimes(selectedDate, appointments);
      setAvailableTimes(slots);
    }
  }, [selectedDate, appointments]);

  const generateAvailableTimes = (date, appointments) => {
    const times = [];
    const startHour = 8;
    const endHour = 18;
    const interval = 60; // minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = new Date(date);
        time.setHours(hour, minute, 0, 0);
        const isBooked = appointments.some(app => new Date(app.date_time).getTime() === time.getTime());
        times.push({ time, isBooked });
      }
    }

    return times;
  };

  const isDateDisabled = (date) => {
    const dateTimes = generateAvailableTimes(date, appointments);
    return dateTimes.every(({ isBooked }) => isBooked);
  };

  return (
    <div>
      <Nav />
      
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">
            <Image
              src="/img/searchIcon.png"
              alt="search icon"
              width={30}
              height={30}
            />
          </label>
          <input
            type="text"
            id="search"
            placeholder="Ville"
            value={searchText}
            onChange={handleSearchChange}
          />
        </form>
       <div className={styles.special}>
        <h3 className={styles.pFilter}>Filtré par specialité : </h3>
        <select name="filter" id="filter" onChange={handleFilterChange} value={selectedOption} className={styles.selectFilter}>
          <option value="all">all</option>
          <option value="Cardiologue">Cardiologue</option>
          <option value="Dermatologue">Dermatologue</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Gastrologue">Gastroenterologue</option>
          <option value="Ophthalmologue">Ophthalmologue</option>
          <option value="Pediatre">Pediatre</option>
          <option value="Psychiatre">Psychiatre</option>
          <option value="Oncologue">Oncologue</option>
          <option value="Dentiste">Dentiste</option>
          <option value="Generaliste">Generaliste</option>
        </select>
        <HiChevronUpDown />
        </div>
      </div>

      {/* Affichage des médecins */}
      <div>
        
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.doctor_id}
            doctor={doctor}
            fetchAppointments={fetchAppointments}
            appointments={appointments}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            availableTimes={availableTimes}
            setSelectedDoctorId={setSelectedDoctorId}
            bookAppointment={bookAppointment}
            setError={setError}
            isDateDisabled={isDateDisabled}
          />
        ))}
      </div>
    </div>
  );
}

const DoctorCard = ({
  doctor,
  fetchAppointments,
  appointments,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  availableTimes,
  setSelectedDoctorId,
  bookAppointment,
  setError,
  isDateDisabled,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleDoctorSelect = async () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setSelectedDoctorId(doctor.doctor_id);
      await fetchAppointments(doctor.doctor_id);
    }
  };





  



  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h2 className={styles.username}><Link href={`/profile?user_name=${doctor.username}`}> {doctor.username} </Link></h2>
        <p className={styles.spec}><b>specialité : {doctor.speciality}</b></p>
        <h4 className={styles.ville}>Ville : {doctor.ville}</h4>
        <p className={styles.adr}>adresse du cabinet : {doctor.adresse}</p>
      </div>
      <button onClick={handleDoctorSelect} className={styles.prendreRdv}>Prendre un rendez-vous</button>

      {isFormVisible && (
        <div className={styles.formContainer}>
          <div className={styles.daytona}>
            <label htmlFor={`date-${doctor.doctor_id}`} className={styles.date}>Date : </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
              className={styles.datePicker}
              filterDate={(date) => !isDateDisabled(date)}
            />
          </div>
          {selectedDate && (
            <div className={styles.time}>
              <label htmlFor={`time-${doctor.doctor_id}`}>Heure :</label>
              <select
                id={`time-${doctor.doctor_id}`}
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className={styles.timePicker}
              >
                <option value="">Sélectionnez une heure</option>
                {availableTimes.map(({ time, isBooked }) => (
                  <option key={time.toISOString()} value={`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`} style={{ backgroundColor: isBooked ? 'red' : 'white', color: isBooked ? 'white' : 'black' }} disabled={isBooked}>
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <button onClick={() => bookAppointment(doctor.doctor_id, selectedDate, selectedTime)} className={styles.confirm}>Confirmer</button>
          <button onClick={() => setIsFormVisible(false)} className={styles.anuler}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default Page;
