import {useEffect, useState, useRef} from "react";
import styles from '@/styles/Transcriber.module.css'

let timer = null
export default function Transcriber({ processVoiceText }) {
  const [isRecording, setIsRecording] = useState(false)
  const [recognition, setRecognition] = useState()
  const [transcription, setTranscription] = useState('')

  useEffect( () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const r = new window.webkitSpeechRecognition()
      // console.log(r)
      setRecognition(r)
      r.lang = 'en-US';

      r.onresult = event => {
        const t = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(' ')
        setTranscription(t)
        processVoiceText(t)
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
    setIsRecording(false)
    recognition.stop()
  }

  return (
    <div>
      <input
        type="button"
        value='Record'
        onTouchStart={startRecord}
        onTouchEnd={stopRecord}
        onMouseDown={startRecord}
        onMouseUp={stopRecord}
        style={{backgroundColor:(isRecording ? 'lightsalmon': 'lightblue')}}
      />
      <div>{transcription}</div>
    </div>
  );
}
