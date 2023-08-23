import * as React from "react";
import styles from '@/styles/ActionString.module.css'

export default function OcrString({ ocrStr }) {
  return (
    <div className={styles.ocrstring}>
      {ocrStr}
    </div>
  );
}
