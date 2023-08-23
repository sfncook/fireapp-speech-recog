import * as React from "react";
import styles from '@/styles/Unit.module.css'

export default function Unit({ unit }) {
  return (
    <div className={styles.unit}>
      {unit}
    </div>
  );
}
