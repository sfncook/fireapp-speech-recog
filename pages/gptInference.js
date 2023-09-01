import {useState, useEffect, useRef} from "react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const initIncData = {
  sectorsByName:{}
}

export default function Home() {

  const [inputTxt, setInputTxt] = useState('');
  const [state, setState] = useState({})
  const inputTxtRef = useRef()

  const submit = async () => {
    try {
      const response = await fetch("/api/gptInference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputTxt,
          state,
        }),
      });

      const data = await response.json()
      console.log(data.result)
      setState(data.result)
    } catch(error) {
      console.error(error);
      alert(error.message)
    }
  }

  const onTextChange = () => setInputTxt(inputTxtRef.current.value)

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
        <input
            type="text"
            onChange={onTextChange}
            ref={inputTxtRef}
        />
        <div>{JSON.stringify(state)}</div>
      </main>
    </>
  )
}
