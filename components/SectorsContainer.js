import * as React from "react";
import Sector from "./Sector.js";
import styles from '@/styles/SectorsContainer.module.css'

export default function SectorsContainer({ incidentData }) {

  console.log("SectorsContainer")
  console.log(incidentData.sectors)
  return (
    <div className={styles.sectorscontainer}>
      {incidentData.sectors && incidentData.sectors.map((s,i)=>
        <Sector key={`${s.name}${i}`} sector={s}/>
      )}
    </div>
  );
}
