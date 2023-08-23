import * as React from "react";
import Cell from "./Cell.js";
import styles from '@/styles/Grid.module.css'
import styles2 from '@/styles/Foo.module.css'

export default function Grid({  }) {
  return (
    <div className={styles.gridcontainer}>
      <Cell/>
      <Cell/>
      <Cell/>
      <Cell/>
      <Cell/>
      <Cell/>
      <Cell/>
      <Cell/>
      <Cell/>
    </div>
  );
}
