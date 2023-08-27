import { useState, useEffect } from "react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import SectorsContainer from "@/components/SectorsContainer.js";
import ActionString from "@/components/ActionString.js";
import allSectorsData from '../data/sectors.json'
import units from '../data/units.json'
import OcrString from "@/components/OcrString.js";
import Transcriber from "@/components/Transcriber.js";

const inter = Inter({ subsets: ['latin'] })

const initIncData = {}

export default function Home() {

  const [incidentData, _setIncidentData] = useState({});
  const [ocrString, setOcrString] = useState();
  const [actionString, setActionString] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setIncidentData(JSON.parse(localStorage.getItem('incidentData')) || initIncData)
    }
  }, [])

  function setIncidentData(_incidentData) {
    // console.log("setIncidentData"+JSON.stringify(_incidentData))
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("incidentData", JSON.stringify(_incidentData))
      _setIncidentData(_incidentData)
    }
  }

  function searchForSector(text) {
    let resp
    allSectorsData.every(sectorData => {
      const nameMatches = sectorData.name.toLowerCase() === text
      const aliasMatches = sectorData.aliases.find(alias=>{
        // console.log(`${alias}=?${text} ${alias===text}`)
        return alias===text
      })
      if(nameMatches || aliasMatches) {
        // console.log(`nameMatches:${nameMatches} aliasMatches:${aliasMatches} sector:${sector.name}`)
        resp = sectorData
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

  const addUnitToSector = (unit, sectorObj) => {
    console.log(`addUnitToSector unit:${unit.name} sectorObj:${sectorObj.name}`)
    const sectorObjToUpdate = incidentData.sectors.find(s=>s.name===sectorObj.name)
    sectorObjToUpdate.units.push(unit)
    setIncidentData({...incidentData})
    setActionString(`Added ${unit.name} to sector ${sectorObj.name}`)
  }

  const changeSector = (newSectorObj, sectorObj) => {
    console.log(`changeSector newSectorObj:${newSectorObj.name} sectorObj:${sectorObj.name}`)
    const sectorObjToUpdate = incidentData.sectors.find(s=>s.name===sectorObj.name)
    sectorObjToUpdate.name = newSectorObj.name
    setIncidentData({...incidentData})
    setActionString(`Updated sector ${sectorObj.name}`)
  }

  const processVoiceText = async voiceText => {
    console.log(voiceText)
    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({voiceText}),
      });

      const data = await response.json()
      console.log(data)
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
        <div className={styles.mainheader}>
          <Transcriber processVoiceText={processVoiceText}/>
          <OcrString ocrStr={ocrString}/>
          <ActionString actionStr={actionString}/>
        </div>
        <SectorsContainer incidentData={incidentData}/>
      </main>
    </>
  )
}
