import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import styles from '@/styles/WritingCanvas.module.css'

export default function GridItem({  }) {
  const canvas = React.useRef()

  return (
    <div>
      <ReactSketchCanvas
        ref={canvas}
        className={styles.writingcanvas}
        strokeWidth={2}
        strokeColor="blue"
        canvasColor="#ffffffdd"
      />
    </div>
  );
}
