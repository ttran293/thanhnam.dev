import React from "react";
import timeline from "../../data/timeline";
import styles from "./BackgroundInfo.module.css"

export default function BackgroundInfo(){
    return (
      <div>
        {timeline.map((item) => (
          <p className={styles.description} key={item.id}>
            <a href={item.url} className={styles.link}>
              <mark className={styles.tag}>{item.tag}</mark>
              </a>{" "} <br></br>
            {item.story}
          </p>
        ))}
      </div>
    );
}
