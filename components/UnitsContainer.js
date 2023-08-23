import * as React from "react";
import styles from '@/styles/UnitsContainer.module.css'
import Unit from "@/components/Unit.js";

export default function UnitsContainer({ units }) {
  return (
    <div className={styles.unitscontainer}>
      {units.map((u,i)=><Unit key={`${u.name}${i}`} unit={u}/> )}
    </div>
  );
}
