import * as React from "react";
import Sector from "./Sector.js";
import styles from '@/styles/GridContainer.module.css'

export default function SectorsContainer({  }) {
  return (
    <div className={styles.gridcontainer}>
      <Sector units={["E213", "E207", "E222"]}/>
      <Sector units={["E202", "E233", "E215","E201"]}/>
      <Sector units={["E205","E216"]}/>
      <Sector units={[]}/>
      <Sector units={[]}/>
      <Sector units={[]}/>
      <Sector units={[]}/>
      <Sector units={[]}/>
      <Sector units={[]}/>
    </div>
  );
}
