

import  styles from "./myvideo.less"
import QierPlayer from 'qier-player';
const myvideo = ()=>{
  return (
    <div className={styles.videobox}>
        {/* <video src="/public/public/video/test.mp4" width="100%" height="100%"  controls="controls" id="video" preload="auto" /> */}
        {/* <video src="../../../../public/video/test.mp4" width="100%" height="100%"  controls="controls" id="video" preload="auto" /> */}
        {/* <video width="500" height="400" controls="controls" id="video" preload="auto">
          <source src="/public/public/video/test.mp4"   type="video/mp4" />
        </video> */}
        <QierPlayer
        language="zh"
        srcOrigin="http://localhost:3000/video/test.mp4" />
    </div>
  );
}

export default myvideo;