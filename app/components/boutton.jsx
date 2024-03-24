import React from 'react'
import styles from "./boutton.module.css"

const Boutton = ({ onClick, textz }) => {
  return (
     <button className={styles.btn} onClick={onClick}>{textz}</button>
     
  )
}

export default Boutton