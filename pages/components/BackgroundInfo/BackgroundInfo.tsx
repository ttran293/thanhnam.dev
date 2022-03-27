import React from "react";
import timeline from "../../data/timeline";
import styles from "./BackgroundInfo.module.css"

export default function BackgroundInfo(props :any){
    return (
      <div>
        {timeline.map((item) => (
          <p className={styles.description}>
              {item.story}
          </p>
        ))}
      </div>
    );
}
