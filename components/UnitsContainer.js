import * as React from "react";
import styles from '@/styles/UnitsContainer.module.css'
import Unit from "@/components/Unit.js";

export default function UnitsContainer({ units }) {
  return (
    <div className={styles.unitscontainer}>
      {units.map(u=><Unit key={u} unit={u}/> )}
    </div>
  );
}
