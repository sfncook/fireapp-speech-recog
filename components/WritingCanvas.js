import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import styles from '@/styles/WritingCanvas.module.css'

let timer = null
export default function GridItem({ onTimeout, uploadImageData }) {
  const canvas = React.useRef()
  const [userStartedWriting, setUserStartedWriting] = React.useState(false)
  const [writingTimerId, setWritingTimerId] = React.useState(null)

  const writingTimerDurMs = 750
  const noActionTimerDurMs = 2000

  // used to de-bounce useEffect which can be called twice in dev mode
  const initialized = React.useRef(false);
  React.useEffect(() => {
    clearTimeout(timer)
    timer = setTimeout(noActionTimeout, noActionTimerDurMs)
  });

  const noActionTimeout = ()=>{
    if(!userStartedWriting) {
      console.log("No activity, closing")
      onTimeout()
    } else {
      console.log("Keep writing")
    }
  }

  const upload = async imgData=>{
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imgData,
        }),
      });

      const data = await response.json();
      console.log(data)
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  const submitWriting = () => {
    console.log("submitWriting")
    if(canvas.current) {
      canvas.current
        .exportImage("png")
        .then((data) => {
          console.log(data);
          upload(data)
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(()=>{
          onTimeout()
        })
    } else {
      onTimeout()
    }
  }
  const onCanvasPenUp = a => {
    console.log(`onCanvasPenUp`)
    console.log(a)
    clearTimeout(writingTimerId)
    const newTimer = setTimeout(submitWriting, writingTimerDurMs)
    // console.log(`clearingTimer:${writingTimerId} newTimer:${newTimer} counter:${counter}`)
    setWritingTimerId(newTimer)
  }

  const onCanvasChange = a => {
    if(a.length) {
      setUserStartedWriting(true)
    }
  }

  return (
    <div>
      <ReactSketchCanvas
        ref={canvas}
        className={styles.writingcanvas}
        strokeWidth={2}
        strokeColor="blue"
        canvasColor="#ffffffdd"
        onStroke={onCanvasPenUp}
        onChange={onCanvasChange}
      />
    </div>
  );
}
