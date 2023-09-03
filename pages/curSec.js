import { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/CurSec.module.css'
import ObjectTable from "@/components/ObjectTable";

const inter = Inter({ subsets: ['latin'] })
const initState = {'radioChannel': '', 'incidentLocation': '', 'units': [], 'sectors': [], 'unitsToRoles': {}, 'nearestHydrant': '', 'symptomsOnScene': '', 'structureDescription': '', 'isWorkingFire': '', 'strategy': '', 'incidentClassification': '', '': 'unknown', 'victims': [], 'manyVictims': 0, 'waterNeeded': [], 'sectorsCleared': [], 'commandUnit': '', 'resourcesNeeded': [], 'isParRequested': false, 'parDeclared': []}

export default function Home()  {
  const [allSeconds, setAllSeconds] = useState([]);
  const [processedSecs, setProcessedSecs] = useState([]);
  const [state, setState] = useState(initState);
  const [lastSpeech, setLastSpeech] = useState()
  const aud = useRef()

  useEffect( () => {
    try {
      fetch("/api/curSec?getAllSec=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
          .then(async response=>{
            const _allS = (await response.json()).map(i=>parseInt(i))
            console.log(_allS)
            setAllSeconds(_allS)
          })
    } catch(error) {
      console.error(error);
      // alert(error.message)
    }
  }, []);

  const processSec = async curSec => {
    if(allSeconds.includes(curSec) && !processedSecs.includes(curSec)) {
      console.log(`process curSec:${curSec}`)
      setProcessedSecs([...processedSecs, curSec])
      try {
        const response = await fetch("/api/curSec", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({curSec}),
        });

        const data = await response.json()
        const _state = data.result.state
        const speech = data.result.speech
        const waitMs = (data.result.endSec - data.result.startSec)*1000
        setTimeout(()=>{
          setState(_state)
          setLastSpeech(speech)
        }, waitMs)
      } catch(error) {
        console.error(error);
        alert(error.message)
      }
    }
  }

  const onTimeUpdate = async () => {
    const curSec = Math.floor(aud.current.currentTime)
    processSec(curSec)
  }

  const findNextLower = (sortedArray, searchValue) => {
    for (let i = 0; i < sortedArray.length - 1; i++) {
      const lower = sortedArray[i]
      const higher = sortedArray[i + 1]
      // console.log(`lower:${lower} higher:${higher}`)
      if ( lower <= searchValue && higher > searchValue) {
        return sortedArray[i];
      }
    }
    if(searchValue<sortedArray[0]) return sortedArray[0]
    else return sortedArray.splice(-1);
  }

  const onSeeked = async () => {
    const curSec = Math.floor(aud.current.currentTime)
    const sortedSecs = [...allSeconds].sort((a, b) => a - b)
    const nextLower = findNextLower(sortedSecs, curSec)
    console.log(`onSeeked: ${curSec} nextLower: ${nextLower}`)
  }

  return (
      <>
        <Head>
          <title>Fire App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <div className={styles.outerheaderrow}>
            <div>House Fire @ 1564 West Linder</div>
            <audio controls src='audio/F2022119715_orig_regenerated.wav'
                   onTimeUpdate={onTimeUpdate}
                   onSeeked={onSeeked}
                   ref={aud}
                   className={styles.radioAudio}
            />
            {lastSpeech && <div className={styles.lastspeech}>{`"${lastSpeech}"`}</div>}
          </div>
          {
            state && <ObjectTable data={state}/>
          }
        </main>
      </>
  )
}
