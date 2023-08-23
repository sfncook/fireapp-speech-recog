import * as React from "react";
import Sector from "./Sector.js";
import styles from '@/styles/SectorsContainer.module.css'

export default function SectorsContainer({  }) {
  return (
    <div className={styles.sectorscontainer}>
      <Sector sector={{title:"Sector A", units:["E213", "E207", "E222"]}}/>
      <Sector sector={{title:"Sector B", units:["E213", "E207", "E222"]}}/>
      <Sector sector={{title:"Sector C", units:["E213", "E207", "E222"]}}/>
      <Sector sector={{title:"Sector D", units:["E213", "E207", "E222"]}}/>
      <Sector sector={{title:"Sector E", units:["E213", "E207", "E222"]}}/>
      <Sector sector={{title:"Sector F", units:["E213", "E207", "E222"]}}/>
    </div>
  );
}
