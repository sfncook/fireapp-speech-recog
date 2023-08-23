import * as React from "react";
import styles from '@/styles/GridItem.module.css'
import WritingCanvas from "./WritingCanvas.js"
import UnitsContainer from "@/components/UnitsContainer.js";

export default function GridItem({ units, submitWriting }) {

  const [showCanvas, setShowCanvas] = React.useState(false)

  const onWritingTimeout = ()=>{
    setShowCanvas(false)
  }

  const onImageData = imageData=>{
    setShowCanvas(false)
    submitWriting()
  }

  return (
    <div className={styles.griditem} onClick={()=>setShowCanvas(true)}>
      <UnitsContainer units={units}/>
      {
        showCanvas && <WritingCanvas onTimeout={onWritingTimeout} onImageData={onImageData}/>
      }
    </div>
  );
}
