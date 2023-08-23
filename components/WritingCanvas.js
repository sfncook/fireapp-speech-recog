import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import styles from '@/styles/WritingCanvas.module.css'

export default function GridItem({ onTimeout }) {
  const canvas = React.useRef()
  const [writingTimerId, setWritingTimerId] = React.useState(null)
  const writingTimerDurMs = 750

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
    // console.log("counter:"+_counter)
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
    // console.log(a)
    clearTimeout(writingTimerId)
    const newTimer = setTimeout(submitWriting, writingTimerDurMs)
    // console.log(`clearingTimer:${writingTimerId} newTimer:${newTimer} counter:${counter}`)
    setWritingTimerId(newTimer)
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
      />
    </div>
  );
}
