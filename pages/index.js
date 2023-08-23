import { useState, useEffect } from "react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import SectorsContainer from "@/components/SectorsContainer.js";
import sectors from '../data/sectors.json'
import units from '../data/units.json'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [incidentData, _setIncidentData] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setIncidentData(localStorage.getItem('incidentData')||{})
    }
  }, [])

  function setIncidentData(_incidentData) {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("incidentData", parseInt(_incidentData))
      _setIncidentData(incidentData)
    }
  }

  const searchForSector = text => {

  }

  const processWriting = async (sector, imageData)=>{
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({imageData}),
      });

      const data = await response.json();
      const dataLowercase = data.map(d=>d.toLowerCase())
      console.log(`data:${data} dataLowercase:${dataLowercase}`)
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Fire App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <SectorsContainer processWriting={processWriting}/>
      </main>
    </>
  )
}
