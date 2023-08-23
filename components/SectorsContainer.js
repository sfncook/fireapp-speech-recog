import * as React from "react";
import Sector from "./Sector.js";
import styles from '@/styles/SectorsContainer.module.css'

export default function SectorsContainer({ incidentData, processWriting }) {

  return (
    <div className={styles.sectorscontainer}>
      {incidentData.sectors && incidentData.sectors.map(s=>
        <Sector key={s.name} sector={s} processWriting={processWriting}/>
      )}
    </div>
  );
}
