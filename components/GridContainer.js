import * as React from "react";
import GridItem from "./GridItem.js";
import styles from '@/styles/GridContainer.module.css'

export default function GridContainer({  }) {
  return (
    <div className={styles.gridcontainer}>
      <GridItem/>
      <GridItem/>
      <GridItem/>
      <GridItem/>
      <GridItem/>
      <GridItem/>
      <GridItem/>
      <GridItem/>
      <GridItem/>
    </div>
  );
}
