import * as React from "react";
import styles from '@/styles/GridItem.module.css'
import WritingCanvas from "./WritingCanvas.js"

export default function GridItem({  }) {

  const [showCanvas, setShowCanvas] = React.useState(false)

  const onWritingTimeout = ()=>{
    setShowCanvas(false)
  }

  return (
    <div className={styles.griditem} onClick={()=>setShowCanvas(true)}>
      <div>Grid Item</div>
      <button
        onClick={() => {
         console.log("click")
        }}
      >
        Click Me
      </button>
      {
        showCanvas && <WritingCanvas onTimeout={onWritingTimeout}/>
      }
    </div>
  );
}
