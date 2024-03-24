"use client"
import Nav from '../components/nav';
import List from './list/List'
import React from 'react';
import Agenda from './agenda/agenda';
import styles from './page.module.css'
import Mult from './multi/mult';
import Footer from '../components/footer';

function MPage() {
    
    
    return (
        <div>
            <Nav />
            <div className={styles.main}>
               <List />
               <Mult/>
            </div>
            <Agenda />
            <Footer />

        </div>
    );
}

export default MPage;
