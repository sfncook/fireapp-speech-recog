import * as React from "react";
import styles from '@/styles/Sector.module.css'
import WritingCanvas from "./WritingCanvas.js"
import UnitsContainer from "@/components/UnitsContainer.js";
import SectorTitle from "@/components/SectorTitle.js";

export default function Sector({ sector, processWriting }) {

  const [showCanvas, setShowCanvas] = React.useState(false)

  const onWritingTimeout = ()=>{
    setShowCanvas(false)
  }

  const onImageData = imageData=>{
    setShowCanvas(false)
    processWriting(sector,imageData)
  }

  return (
    <div className={styles.sector} onClick={()=>setShowCanvas(true)}>
      <SectorTitle sector={sector}/>
      <UnitsContainer units={sector.units}/>
      {
        showCanvas && <WritingCanvas onTimeout={onWritingTimeout} onImageData={onImageData}/>
      }
    </div>
  );
}
