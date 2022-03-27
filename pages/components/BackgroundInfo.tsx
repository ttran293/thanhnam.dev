import React, { useState } from "react";
import timeline from "../data/timeline";
import styles from "../components/BackgroundInfo.module.css";

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
