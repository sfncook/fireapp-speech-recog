import { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/CurSec.module.css'
import ObjectTable from "@/components/ObjectTable";

const inter = Inter({ subsets: ['latin'] })

export default function Home()  {
  const [allSeconds, setAllSeconds] = useState([]);
  const [processedSecs, setProcessedSecs] = useState([]);
  const [state, setState] = useState(null);
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

  const onTimeUpdate = async () => {
    const curSec = Math.floor(aud.current.currentTime)
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
        console.log(data.result.state)
        setState(data.result.state)
      } catch(error) {
        console.error(error);
        // alert(error.message)
      }
    }
  }

  return (
      <>
        <Head>
          <title>Fire App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <div>
            <div>House Fire @ 1564 West Linder</div>
            <audio controls src='audio/F2022119715_orig_regenerated.wav' onTimeUpdate={onTimeUpdate} ref={aud} />
          </div>
          {
            state && <ObjectTable data={state}/>
          }
        </main>
      </>
  )
}
