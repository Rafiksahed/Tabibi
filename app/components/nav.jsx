import styles from './nav.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
  return (
    <div className={styles.nav}>
        <Image 
          src="/img/logoT.png"
          width={130}
          height={50}
        />
        <ul className={styles.links}>
            <li className={styles.Link}><Link  href="#">Services</Link></li>
            <li className={styles.Link} id={styles.ligne}><Link  href="#">Specialité</Link></li>
            <li className={styles.Link} ><Link  href="#">Nous Contacter</Link></li>
            <li className={styles.button}><Link  href="#"><button>Login</button></Link></li>
        </ul>
    </div>
  )
}

export default Nav;