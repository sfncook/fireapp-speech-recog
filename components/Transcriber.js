import {useEffect, useState, useRef} from "react";
import styles from '@/styles/Transcriber.module.css'

let timer = null
export default function Transcriber({ processVoiceText }) {
  const [isRecording, setIsRecording] = useState(false)
  const [recognition, setRecognition] = useState()
  const [transcription, setTranscription] = useState('')
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect( () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const r = new window.webkitSpeechRecognition()
      // console.log(r)
      setRecognition(r)
      r.lang = 'en-US';

      r.onresult = async event => {
        const t = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(' ')
        setTranscription(t)
        await processVoiceText(t)
        setIsWaiting(false)
      }
    }
  }, []);

  const startRecord = async () => {
    console.log("Start record")
    setIsRecording(true)
    recognition.start()
  }

  const stopRecord = async () => {
    console.log("Stop record")
    setIsWaiting(true)
    setIsRecording(false)
    setTimeout(async ()=>{recognition.stop()}, 750)
  }

  return (
    <div className={styles.transcriber}>
      <div className={styles.transcriberTopRow}>
        <input
          className={styles.recordButton}
          type="button"
          value='Press & Hold to enter radio command'
          onTouchStart={startRecord}
          onTouchEnd={stopRecord}
          onMouseDown={startRecord}
          onMouseUp={stopRecord}
          disabled={isWaiting}
          style={{backgroundColor:(isRecording ? 'lightsalmon': 'lightgreen')}}
        />
        {(isWaiting) && <div className={styles.spinner}></div>}
      </div>
      <div>{transcription}</div>
    </div>
  );
}
