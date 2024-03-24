import { useEffect, useState } from 'react';
import React from 'react';
import styles from './agenda.module.css';

function Agenda() {
  const [startDate, setStartDate] = useState(new Date());

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

  const days = updateDays(startDate);

  const prevWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() - 7); 
    setStartDate(newStartDate); 
  };

  const nextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + 7); 
    setStartDate(newStartDate); 
  };


  const addEvent = (date, hour, description) => {
    days.forEach(day => {
      if (day.date === date) {
        day.events[hour] = description;
      }
    });
  };

  addEvent('24 mars', '8', 'mr ded');
  addEvent('24 mars', '9', 'mr tsa');
  addEvent('24 mars', '11', 'mme jaadad');
  addEvent('27 mars', '10', 'mme');
  addEvent('25 mars', '14', 'mme zfzfzfzf');

  return (
    <div className={styles.agenda}> 
      <h1 className={styles.h}>Agenda</h1>  
      <div>
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
