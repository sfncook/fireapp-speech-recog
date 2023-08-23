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

  function searchForSector(text) {
    let resp
    sectors.every(sector => {
      const nameMatches = sector.name.toLowerCase() === text
      const aliasMatches = sector.aliases.find(alias=>{
        // console.log(`${alias}=?${text} ${alias===text}`)
        return alias===text
      })
      if(nameMatches || aliasMatches) {
        // console.log(`nameMatches:${nameMatches} aliasMatches:${aliasMatches} sector:${sector.name}`)
        resp = sector
        return false
      }
      return true
    })
    return resp
  }
  const searchForUnit = text => {
    let resp
    units.every(unit => {
      if(unit.name.toLowerCase() === text) {
        resp = unit
        return false
      }
      return true
    })
    return resp
  }

  const processWriting = async (sector, imageData)=>{
    console.log(imageData)
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
      const text = dataLowercase[0]
      const sector = searchForSector(text)
      const unit = searchForUnit(text)
      sector && sector.name && console.log(`**** sector:${sector.name}`)
      unit && unit.name && console.log(`**** unit:${unit.name}`)
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
