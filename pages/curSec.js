import { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/CurSec.module.css'
import ObjectTable from "@/components/ObjectTable";
import dataF2022119715 from '../data/F2022119715.json'

const inter = Inter({ subsets: ['latin'] })
const initState = {'radioChannel': '', 'incidentLocation': '', 'units': [], 'sectors': [], 'unitsToRoles': {}, 'nearestHydrant': '', 'symptomsOnScene': '', 'structureDescription': '', 'isWorkingFire': '', 'strategy': '', 'incidentClassification': '', '': 'unknown', 'victims': [], 'manyVictims': 0, 'waterNeeded': [], 'sectorsCleared': [], 'commandUnit': '', 'resourcesNeeded': [], 'isParRequested': false, 'parDeclared': []}

export default function Home()  {
  const [state, setState] = useState(initState);
  const [lastSpeech, setLastSpeech] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const aud = useRef()

  const onTimeUpdate = async () => {
    setIsRecording(dataF2022119715.find(d =>
        aud.current.currentTime>=d.startSec &&
        aud.current.currentTime<=d.endSec)
    )
    const curSec = Math.ceil(aud.current.currentTime)
    const data = dataF2022119715.find(d => d.endSec === curSec)
    if(data) {
      setState(data.state)
      setLastSpeech(data.speech)
    }
  }

  const dotStyle = isRecording ? `${styles.dot} ${styles.recordingdot} ${styles.blinking}` : styles.dot
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
                   ref={aud}
                   className={styles.radioAudio}
            />
            <div className={styles.speechrow}>
              <div className={dotStyle}> </div>
              {
                lastSpeech && <div className={styles.lastspeech}>{`"${lastSpeech}"`}</div>
              }
            </div>
          </div>
          {
            state && <ObjectTable data={state}/>
          }
        </main>
      </>
  )
}
