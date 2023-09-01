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

const initIncData = {
  sectorsByName:{}
}

export default function Home() {

  const [incidentData, setIncidentData] = useState(initIncData);
  const [ocrString, setOcrString] = useState();
  const [actionString, setActionString] = useState();

  const submit = async () => {
    try {
      const response = await fetch("/api/gpt_F2022119715", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json()
      console.log(data.result)
    } catch(error) {
      console.error(error);
      // alert(error.message)
    }
  }

  return (
    <>
      <Head>
        <title>Fire App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <input
            type="button"
            value='Submit'
            onClick={submit}
        />
      </main>
    </>
  )
}
