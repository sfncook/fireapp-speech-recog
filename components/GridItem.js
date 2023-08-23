import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import styles from '@/styles/GridItem.module.css'

export default function GridItem({  }) {
  const canvas = React.useRef()

  return (
    <div className={styles.griditem}>
      <div>Grid Item</div>
      <button
        onClick={() => {
         console.log("click")
        }}
      >
        Click Me
      </button>
      <ReactSketchCanvas
        ref={canvas}
        className={styles.griditemcanvas}
        strokeWidth={2}
        strokeColor="blue"
        height="6em"
      />
    </div>
  );
}
