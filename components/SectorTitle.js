import * as React from "react";
import styles from '@/styles/Sector.module.css'

export default function SectorTitle({ sector }) {
  return (
    <div className={styles.sectortitle}>
      {sector.name}
    </div>
  );
}
