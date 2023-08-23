import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import styles from '@/styles/GridItem.module.css'

export default function GridItem({  }) {
  const canvas = React.useRef()

  return (
    <div className={styles.griditem}>
      fuck
      <ReactSketchCanvas
        ref={canvas}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
        strokeWidth={4}
        strokeColor="red"
      />
    </div>
  );
}
