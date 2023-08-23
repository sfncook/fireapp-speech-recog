import * as React from "react";
import styles from '@/styles/ActionString.module.css'

export default function ActionString({ actionStr }) {
  return (
    <div className={styles.actionstring}>
      {actionStr}
    </div>
  );
}
