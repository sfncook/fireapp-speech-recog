import { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home()  {
  const [audioFile, setAudioFile] = useState(null);
  const [prevSec, setPrevSec] = useState(0);
  const aud = useRef()

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(URL.createObjectURL(file));
  };

  const onTimeUpdate = async () => {
    const curSec = Math.floor(aud.current.currentTime)
    // Transmit time value every second
    if(curSec - prevSec >= 1) {
      setPrevSec(curSec)
      console.log(`transmitting curSec: ${curSec}`)
      try {
        const response = await fetch("/api/curSec", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({curSec}),
        });

        const data = await response.json()
        console.log(data.result)
      } catch(error) {
        console.error(error);
        // alert(error.message)
      }
    }
  }

  return (
      <div>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        {audioFile && <audio controls src={audioFile} onTimeUpdate={onTimeUpdate} ref={aud} />}
      </div>
  );
}
