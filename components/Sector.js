import * as React from "react";
import styles from '@/styles/Sector.module.css'
import UnitsContainer from "@/components/UnitsContainer.js";
import SectorTitle from "@/components/SectorTitle.js";

export default function Sector({ sector }) {
  return (
    <div className={styles.sector}>
      <SectorTitle sector={sector}/>
      <UnitsContainer units={sector.units}/>
    </div>
  );
}
