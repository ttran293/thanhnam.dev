import React from "react";
import timeline from "../../data/timeline";
import styles from "./BackgroundInfo.module.css"

export default function BackgroundInfo(){
    return (
      <div>
        {timeline.map((item) => (
          <p className={styles.description} key={item.id}>
            {item.story}
          </p>
        ))}
      </div>
    );
}
