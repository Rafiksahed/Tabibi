import React, { useState, useEffect } from 'react';
import styles from './agenda.module.css';

function Agenda() {
  const [startDate, setStartDate] = useState(new Date());
  const [days, setDays] = useState([]);

  // Effect to update days and fetch appointments on startDate change
  useEffect(() => {
    const newDays = updateDays(startDate);
    setDays(newDays);
    fetchAppointments(newDays);
  }, [startDate]);

  // Function to update days based on the current startDate
  const updateDays = (startDate) => {
    const nextDays = [];
    for (let i = 0; i < 6; i++) {
      const nextDay = new Date(startDate);
      nextDay.setDate(startDate.getDate() + i);
      const dayInfo = {
        day: nextDay.toLocaleDateString('fr-FR', { weekday: 'short' }),
        date: nextDay.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }),
        events: {}
      };
      nextDays.push(dayInfo);
    }
    return nextDays;
  };

  // Function to fetch appointments and update days with events
  const fetchAppointments = async (daysToUpdate) => {
    try {
      const response = await fetch('http://localhost:3001/api/agenda', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        const updatedDays = daysToUpdate.map(day => {
          data.appointments.forEach(appointment => {
            const appointmentDate = new Date(appointment.date_time).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
            const hour = new Date(appointment.date_time).getHours().toString();
            if (day.date === appointmentDate) {
              day.events[hour] = appointment.patient_name;
            }
          });
          return day;
        });
        setDays(updatedDays);
      } else {
        console.error('Failed to fetch appointments:', data.message);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Function to move to the previous week
  const prevWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7); 
    setStartDate(newStartDate); 
  };

  // Function to move to the next week
  const nextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7); 
    setStartDate(newStartDate); 
  };

  return (
    <div className={styles.agenda}> 
      <h1 className={styles.h}>Agenda</h1>  
      <div className={styles.button}>
        <button className={styles.prevButton} onClick={prevWeek}>Semaine précédente</button>
        <button className={styles.nextButton} onClick={nextWeek}>Semaine suivante</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr className={styles.col}>
            <th></th>
            {days.map((dayInfo, idx) => (
              <th key={idx} className={`${styles.thead} ${dayInfo.day === 'ven.' ? styles.specialDay : ''}`}>
                <div>{dayInfo.day}</div>
                <div>{dayInfo.date}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableB}>
          {[...Array(10)].map((_, i) => (
            <tr key={i} className={styles.rowborder}> 
              <td className={styles.row}>{8 + i}:00 {(8 + i) < 12 ? 'AM' : 'PM'}</td>
              {days.map((day, j) => (
                <td key={j} className={`${styles.ctn} ${day.events && day.events[(8 + i).toString()] ? styles.cellFilled : ''}`}>
                  {day.events && day.events[(8 + i).toString()] &&
                    <div>{day.events[(8 + i).toString()]} </div>
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Agenda;
``
