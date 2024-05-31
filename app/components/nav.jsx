import styles from './nav.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';


const NavPatient = ({ handleLogout }) => (
  <div className={styles.nav}>
      <Link href='/'>
        <Image 
          src="/img/logoT.png"
          width={130}
          height={50}
        />
        </Link>
        <ul className={styles.links}>
            <li className={styles.Link}><Link  href="/pPage">Mes rendez-vous</Link></li>
            <li className={styles.Link} id={styles.ligne}><Link  href="/services">Prendre un rendez-vous</Link></li>
            <li className={styles.Link} ><Link  href="/profile">Profil</Link></li>
            <li className={styles.button}><Link  href="./login"><button onClick={handleLogout}>Logout</button></Link></li>
        </ul>
    </div>
);

// Composant pour la barre de navigation des médecins
const NavMedecin = ({ handleLogout }) => (
  <div className={styles.nav}>
  <Link href='/'>
    <Image 
      src="/img/logoT.png"
      width={130}
      height={50}
    />
    </Link>
    <ul className={styles.links}>
        <li className={styles.Link}><Link  href="/mPage">Mes Rendez-vous</Link></li>
        <li className={styles.Link} id={styles.ligne}><Link  href="/services">Prendre un rendez-vous</Link></li>
        <li className={styles.Link} ><Link  href="/profile">Profile</Link></li>
        <li className={styles.button}><Link  href="./login"><button onClick={handleLogout}>Logout</button></Link></li>
    </ul>
</div>
);

// Composant pour la barre de navigation par défaut
const NavDefault = ({ handleLogout }) => (
  <div className={styles.nav}>
      <Link href='/'>
        <Image 
          src="/img/logoT.png"
          width={130}
          height={50}
        />
        </Link>
        <ul className={styles.links}>
            <li className={styles.Link}><Link  href="./login">Services</Link></li>
            <li className={styles.Link} id={styles.ligne}><Link  href="./login">Prendre un rendez-vous</Link></li>
            <li className={styles.Link} ><Link  href="#">Nous Contacter</Link></li>
            <li className={styles.button}><Link  href="./login"><button onClick={handleLogout}>Login</button></Link></li>
        </ul>
    </div>
);

const Nav = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Rediriger l'utilisateur vers la page de login ou une autre page appropriée après la déconnexion
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', data.message || 'Internal server error');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const [userType, setUserType] = useState('');

  useEffect(() => {
      const fetchUserType = async () => {
          try {
              const response = await fetch('http://localhost:3001/api/userType', {
                  credentials: 'include' // Assurez-vous d'inclure les credentials si nécessaire
              });
              const data = await response.json();
              if (response.ok && data.success) {
                  setUserType(data.userType);
              } else {
                  throw new Error(data.message || 'Failed to fetch user type');
              }
          } catch (error) {
              console.error('Error fetching user type:', error);
          }
      };

      fetchUserType();
  }, []);

  let navComponent;

  // Conditions pour déterminer le composant de navigation à afficher en fonction du type d'utilisateur
  if (userType === 'patient') {
      navComponent = <NavPatient  handleLogout={handleLogout}/>;
  } else if (userType === 'medecin') {
      navComponent = <NavMedecin handleLogout={handleLogout}/>;
  } else {
      navComponent = <NavDefault handleLogout={handleLogout}/>;
  }

  return navComponent;
}

export default Nav;