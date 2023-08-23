import { useState, useEffect } from "react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import SectorsContainer from "@/components/SectorsContainer.js";
import allSectorsData from '../data/sectors.json'
import units from '../data/units.json'

const inter = Inter({ subsets: ['latin'] })

// const initIncidentSectorsUnits = {
//   sectors:[
//     {"name":"Transportation", units:["E207","E222","E203"]},
//     {"name":"Sector 3", units:["E215","L214"]},
//     {"name":"IRIC", units:["SWA228","E9"]},
//     {"name":"RESCUE", units:["Lt24","BT36","HM38"]},
//   ]
// }
const initIncData = {
  sectors:[
    {...allSectorsData[0], ...{units:[]}},
    {...allSectorsData[4], ...{units:[]}},
    {...allSectorsData[5], ...{units:[]}},
  ]
}

export default function Home() {

  const [incidentData, _setIncidentData] = useState({});

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

  const processWriting = async (sectorObj, imageData)=>{
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
      const sectorData = searchForSector(text)
      const unitData = searchForUnit(text)
      sectorData && sectorData.name && console.log(`**** sector:${sectorData.name}`)
      unitData && unitData.name && console.log(`**** unit:${unitData.name}`)
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
        <SectorsContainer incidentData={incidentData} processWriting={processWriting}/>
      </main>
    </>
  )
}
