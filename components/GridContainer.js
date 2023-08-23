import * as React from "react";
import GridItem from "./GridItem.js";
import styles from '@/styles/Grid.module.css'
import styles2 from '@/styles/Foo.module.css'

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
