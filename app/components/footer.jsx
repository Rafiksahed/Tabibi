import React from 'react';
import Image from 'next/image';
import styles from './footer.module.css'

function Footer() {
  return (
    <div className={styles.footer}>
      <div>
      <div>
        <ul>
          <li>
          <Image
          src="/img/icons8-courrier-50.png"
          alt='logo'
          height={40}
          width={40}
        />
          </li>
          <li>
          <Image
          src="/img/icons8-facebook-50.png"
          alt='logo'
          height={40}
          width={40}
        />
          </li>
          <li>
          <Image
          src="/img/icons8-instagram-50.png"
          alt='logo'
          height={40}
          width={40}
        />
          </li>
          <li>
          <Image
          src="/img/icons8-twitterx-50.png"
          alt='logo'
          height={40}
          width={40}
        />
          </li>
        </ul>
      </div>
      
      <p>adresse: Saad Dahleb , Blida</p>
      <p>•condition generale</p>
      <p>© 2023 All right reserved</p>
      </div>
    </div>
  )
}

export default Footer