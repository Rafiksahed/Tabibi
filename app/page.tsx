import Image from 'next/image'
import styles from './page.module.css'
import Boutton from './components/boutton'
import BouttonP from "./components/bouttonP"

export default function Home() {
  
  return (
    <div className={styles.main}>
       <div className={styles.accueil}>
         <div className={styles.search}>
           <h1>Prenez un <br/> rendez vous</h1>
           <form action="">
            <label htmlFor="">
            <Image 
              src="/img/searchIcon.png"
              alt='search icon'
              width={30}
              height={30}
            />
            </label>
            <input type="text" placeholder='specialité , Nom' />
           </form>
         </div>
         <div className={styles.mainImg}>
            <Image 
              src="/img/main.png"
              alt="image medecin"
              width={450}
              height={360}
            />
         </div>
       </div>
      <div className={styles.parent}>
       <div className={styles.card}>
          <div className={styles.box}>
            <h2>Prenez facilement <br/>un rendez-vous</h2>
            <p>prise de rendez-vous facile <br />il vous suffit juste de crée un compte</p>
            <Boutton />
          </div>
          <div>
            <h2>Vous etes <br/>medecin ?</h2>
            <p>Vous voulez rejoindre l'aventure ? <br />Enregistrer vous pour commencer</p>
            <Boutton />
          </div>
       </div>
      </div>
      <div className={styles.description}>
         <div>
           <Image 
           src="/img/clr.png"
           alt='docteur image'
           height={350}
           width={400}
           />
         </div>
         <div className={styles.text}>
           <h1>Tabibi</h1>
           <p>Bienvenue sur Tabibi, votre plateforme santé tout-en-un. 
            Simplifiez votre parcours de soins en réservant facilement des
             consultations en ligne avec des professionnels de confiance. Tabibi offre
              une expérience fluide, de la prise de rendez-vous aux rappels personnalisés.
            Découvrez une nouvelle façon pratique et moderne de prendre soin de votre santé avec Tabibi</p>
         </div>
      </div>
      <div className={styles.service}>
         <h1>Nos Services</h1>
         <div className={styles.services}>
          <div className={styles.box2}>
            <Image 
            src="/img/icons8-porte-voix-96.png"
            alt="megaphone"
            height={70}
            width={70}
            className={styles.img}
            />
            <p><b>Recevez </b>des messages de sensibilisation pour prévenir l'apparition de maladies.</p>
          </div>
          <div className={styles.box2}>
            <Image 
            src="/img/icons8-cardiogram-64.png"
            alt="pc"
            height={70}
            width={70}
            className={styles.img}
            />
            <p><b>Assurez une gestion sécurisée</b> sécurisée de votre santé
               vos documents et vos rendez-vous.
             </p>
          </div>
          <div className={styles.box2}>
            <Image 
            src="/img/icons8-calendrier-96.png"
            alt="calendrier"
            height={70}
            width={70}
            className={styles.img}
            />
            <p><b>Profitez d'un accès rapide et facile</b> à une communauté étendue de 
            professionnels de la santé.</p>
          </div>
         </div>
      </div>
      <div className={styles.rencontre}>
        <div className={styles.text2}>
          <h1>Rencontrez nos <br />médecin</h1>
          <p>Bénéficiez de soins de qualité. Nous sommes là pour prendre
             soin de vous et répondre à vos besoins médicaux. 
             Prenez rendez-vous dès maintenant .
          </p>
          <BouttonP />
        </div>
        <div>
          <Image 
            src="/img/clr2.png"
            alt='image de medecin'
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  )
}
