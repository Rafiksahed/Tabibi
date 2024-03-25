import styles from './nav.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
  return (
    <div className={styles.nav}>
      <Link href='/'>
        <Image 
          src="/img/logoT.png"
          width={130}
          height={50}
        />
        </Link>
        <ul className={styles.links}>
            <li className={styles.Link}><Link  href="/services">Services</Link></li>
            <li className={styles.Link} id={styles.ligne}><Link  href="#">Specialité</Link></li>
            <li className={styles.Link} ><Link  href="#">Nous Contacter</Link></li>
            <li className={styles.button}><Link  href="./login"><button>Login</button></Link></li>
        </ul>
    </div>
  )
}

export default Nav;