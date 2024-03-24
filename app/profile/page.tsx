"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import anes from '../../../../public/photo1678456791.jpeg'
import { useState } from 'react'
import Info from '../components/info/Info'
import Nav from '../components/nav'
import Footer from '../components/footer'

function page() {

    return (
        <div>
            <Nav />
        <Info />
        </div>
    )


}

export default page