"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './info.css'
import anes from '../../../public/photo1678456791.jpeg'
import { useState } from 'react'
import { FaUserDoctor } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";


function Info() {
  
    const [select, setSelect] = useState(1);

    
    const display1 = () =>{
        setSelect(1)
        const one = document.getElementById('one');
    const two = document.getElementById('two');
    const three = document.getElementById('three');
    const four = document.getElementById('four');
    const five = document.getElementById('five');
    if (one) {
      one.style.backgroundColor = '#022550'
    one.style.color = '#e6e6e6';
    }
    if (two) {
        two.style.backgroundColor = 'transparent';
        two.style.color = '#252525';
        }
        if (three) {
          three.style.backgroundColor = 'transparent';
          three.style.color = '#252525';
          }
          if (four) {
            four.style.backgroundColor = 'transparent';
            four.style.color = '#252525';
            }
            if (five) {
                five.style.backgroundColor = 'transparent';
                five.style.color = '#252525';
                }
    }
    const display2 = () =>{
        setSelect(2)
        const one = document.getElementById('one');
        const two = document.getElementById('two');
        const three = document.getElementById('three');
        const four = document.getElementById('four');
    const five = document.getElementById('five');
        if (two) {
            two.style.backgroundColor = '#022550'
          two.style.color = '#e6e6e6';
          }
          if (one) {
            one.style.backgroundColor = 'transparent';
            one.style.color = '#252525';
            }
            if (three) {
              three.style.backgroundColor = 'transparent';
              three.style.color = '#252525';
              }
              if (four) {
                four.style.backgroundColor = 'transparent';
                four.style.color = '#252525';
                }
                if (five) {
                    five.style.backgroundColor = 'transparent';
                    five.style.color = '#252525';
                    }
    }
    const display3 = () =>{
        setSelect(3)
        const one = document.getElementById('one');
        const two = document.getElementById('two');
        const three = document.getElementById('three');
        const four = document.getElementById('four');
    const five = document.getElementById('five');
        if (three) {
            three.style.backgroundColor = '#022550'
          three.style.color = '#e6e6e6';
          }
          if (one) {
            one.style.backgroundColor = 'transparent';
            one.style.color = '#252525';
            }
            if (two) {
              two.style.backgroundColor = 'transparent';
              two.style.color = '#252525';
              }
              if (four) {
                four.style.backgroundColor = 'transparent';
                four.style.color = '#252525';
                }
                if (five) {
                    five.style.backgroundColor = 'transparent';
                    five.style.color = '#252525';
                    }
    }
    const display4 = () =>{
        setSelect(4)
        const one = document.getElementById('one');
        const two = document.getElementById('two');
        const three = document.getElementById('three');
        const four = document.getElementById('four');
    const five = document.getElementById('five');
        if (four) {
            four.style.backgroundColor = '#022550'
          four.style.color = '#e6e6e6';
          }
          if (one) {
            one.style.backgroundColor = 'transparent';
            one.style.color = '#252525';
            }
            if (three) {
              three.style.backgroundColor = 'transparent';
              three.style.color = '#252525';
              }
              if (two) {
                two.style.backgroundColor = 'transparent';
                two.style.color = '#252525';
                }
                if (five) {
                    five.style.backgroundColor = 'transparent';
                    five.style.color = '#252525';
                    }
    }
    const display5 = () =>{
        setSelect(5)
        const one = document.getElementById('one');
        const two = document.getElementById('two');
        const three = document.getElementById('three');
        const four = document.getElementById('four');
    const five = document.getElementById('five');
        if (five) {
            five.style.backgroundColor = '#022550'
          five.style.color = '#e6e6e6';
          }
          if (one) {
            one.style.backgroundColor = 'transparent';
            one.style.color = '#252525';
            }
            if (three) {
              three.style.backgroundColor = 'transparent';
              three.style.color = '#252525';
              }
              if (four) {
                four.style.backgroundColor = 'transparent';
                four.style.color = '#252525';
                }
                if (two) {
                    two.style.backgroundColor = 'transparent';
                    two.style.color = '#252525';
                    }
    }
  return (
    <div>
      <div className='des'>
            <ul>
            <li><button onClick={display1} id='one'> Profile </button></li>
                <li><button onClick={display2} id='two'> Note </button></li>
                <li><button onClick={display3} id='three'> Favorite </button></li>
                <li><button onClick={display4} id='four'> Historique </button></li>
                <li><button onClick={display5} id='five'> Contact </button></li>
                <li><button className='logout'> Log out </button></li>
            </ul>
       
        </div>
    <div className='all'>
      <Link href='../../pages/chat' className='message'>prenez rendez vous</Link>
        

     <div className='info'>

     {select === 1 && (


            <div className='patientInfo'>
                <ul>
                <li>city: <li> bougara Blida </li> </li>
                <li>gender: <li> male </li></li>
                <li>blood: <li> o+ </li></li>
                <li>danger sick: <li> nothing </li></li>
                <li>optical: <li> rafik sahed </li></li>
                </ul>
                <ul>
                <li>number: <li> 0674803439 </li></li>
                <li>email: <li> anesamrane9@gmail.com </li></li>
                <li>birthday: <li> 05/01/2002 </li></li>
                <li>health situation: <li> stable </li></li>
                </ul>
            </div>

     )}




{select === 2 && (


<div className='patientInfo'>
    <ul>
    <li>Note: <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum dolor doloribus facilis odit! Unde ducimus aperiam ad veniam ea quod dolore error amet, et aut reiciendis, expedita aspernatur hic? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, aperiam quo at facilis modi voluptatum, id delectus quisquam dicta asperiores quasi natus molestiae incidunt dolor sint corrupti rerum. Inventore, earum.</li> </li>
    </ul>
</div>

)}





{select === 3 && (


<div className='fav'>
    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Anes amrane</h4>
        <p>dentist</p>
      </div>
    </Link>


    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Rafik sahed</h4>
        <p>psychologue</p>
      </div>
    </Link>



    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Djeghab kacem yacine</h4>
        <p>cardialogue</p>
      </div>
    </Link>
</div>

)}






{select === 4 && (


<div className='his'>
    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Anes amrane</h4>
        <p>dentist</p>
        <p>15:34 Am</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Debitis architecto ex eius maiores sapiente reiciendis vitae perspiciatis culpa eveniet, 
           optio repellat inventore asperiores expedita 
          accusamus exercitationem assumenda quam ullam mollitia?</p>
      </div>
    </Link>


    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Rafik sahed</h4>
        <p>psychologue</p>
        <p>15:34 Am</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Debitis architecto ex eius maiores sapiente reiciendis vitae perspiciatis culpa eveniet, 
           optio repellat inventore asperiores expedita 
          accusamus exercitationem assumenda quam ullam mollitia?</p>
      </div>
    </Link>



    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Djeghab kacem yacine</h4>
        <p>cardialogue</p>
        <p>15:34 Am</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Debitis architecto ex eius maiores sapiente reiciendis vitae perspiciatis culpa eveniet, 
           optio repellat inventore asperiores expedita 
          accusamus exercitationem assumenda quam ullam mollitia?</p>
      </div>
    </Link>



    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Djeghab kacem yacine</h4>
        <p>cardialogue</p>
        <p>15:34 Am</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Debitis architecto ex eius maiores sapiente reiciendis vitae perspiciatis culpa eveniet, 
           optio repellat inventore asperiores expedita 
          accusamus exercitationem assumenda quam ullam mollitia?</p>
      </div>
    </Link>





    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Djeghab kacem yacine</h4>
        <p>cardialogue</p>
        <p>15:34 Am</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Debitis architecto ex eius maiores sapiente reiciendis vitae perspiciatis culpa eveniet, 
           optio repellat inventore asperiores expedita 
          accusamus exercitationem assumenda quam ullam mollitia?</p>
      </div>
    </Link>
</div>

)}








{select === 5 && (


<div className='fav'>
    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Anes amrane</h4>
        <p>dentist</p>
      </div>
    </Link>


    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Rafik sahed</h4>
        <p>psychologue</p>
      </div>
    </Link>



    <Link href='' className='card'>
      <div className='userLogo'><FaUserDoctor /></div> {/* User logo */}
      <div className='userInfo'>
        <h4>Djeghab kacem yacine</h4>
        <p>cardialogue</p>
      </div>
    </Link>
</div>

)}


        </div>
    </div>
    </div>
      
  )
}

export default Info