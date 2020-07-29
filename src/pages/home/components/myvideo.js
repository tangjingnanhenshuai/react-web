

import  styles from "./myvideo.less"
import QierPlayer from 'qier-player';
import {useState,useEffect} from "react"
const myvideo = (prop)=>{
 
  useEffect(()=>{
        document.getElementById("qireplayer").getElementsByTagName('video')[0].setAttribute("poster",prop.img)
  },[prop])
  
  return (
    <div className={styles.videobox}     id="qireplayer">
       <h4>{prop.name}</h4>
        <QierPlayer
        language="zh"
        width={400}
        height={300}
        themeColor='#f23300'
        srcOrigin={prop.url} />
    </div>
  );
}

export default myvideo;