import * as React from "react";
import Sector from "./Sector.js";
import styles from '@/styles/SectorsContainer.module.css'

export default function SectorsContainer({  }) {

  const processWriting = async (sector, imageData)=>{
    console.log(imageData)
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({imageData}),
      });

      const data = await response.json();
      console.log(data)
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.sectorscontainer}>
      <Sector sector={{title:"Sector A", units:["E213", "E207", "E222"]}} processWriting={processWriting}/>
      <Sector sector={{title:"Sector B", units:["E213", "E207", "E222"]}} processWriting={processWriting}/>
      <Sector sector={{title:"Sector C", units:["E213", "E207", "E222"]}} processWriting={processWriting}/>
      <Sector sector={{title:"Sector D", units:["E213", "E207", "E222"]}} processWriting={processWriting}/>
      <Sector sector={{title:"Sector E", units:["E213", "E207", "E222"]}} processWriting={processWriting}/>
      <Sector sector={{title:"Sector F", units:["E213", "E207", "E222"]}} processWriting={processWriting}/>
    </div>
  );
}
