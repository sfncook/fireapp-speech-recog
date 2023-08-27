import * as React from "react";
import Sector from "./Sector.js";
import styles from '@/styles/SectorsContainer.module.css'

export default function SectorsContainer({ incidentData }) {

  const sectors = incidentData.sectorsByName ? Object.values(incidentData.sectorsByName) : []
  return (
    <div className={styles.sectorscontainer}>
      {sectors.map((s,i)=>
        <Sector key={`${s.name}${i}`} sector={s}/>
      )}
    </div>
  );
}
