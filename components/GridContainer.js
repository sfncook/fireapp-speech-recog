import * as React from "react";
import GridItem from "./GridItem.js";
import styles from '@/styles/GridContainer.module.css'

export default function GridContainer({  }) {
  return (
    <div className={styles.gridcontainer}>
      <GridItem units={["E213", "E207", "E222"]}/>
      <GridItem units={["E202", "E233", "E215","E201"]}/>
      <GridItem units={["E205","E216"]}/>
      <GridItem units={[]}/>
      <GridItem units={[]}/>
      <GridItem units={[]}/>
      <GridItem units={[]}/>
      <GridItem units={[]}/>
      <GridItem units={[]}/>
    </div>
  );
}
