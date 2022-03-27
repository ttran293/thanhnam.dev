import React, { useState } from "react";
import projects from "../../data/projects";
import styles from "./ProjectInfo.module.css";

export default function BackgroundInfo(props: any) {
  return (
    <div>
      {projects.map((item) => (
        <>
          <h2>{item.name}</h2>
          <p className={styles.description}>{item.description}</p>
        </>
      ))}
    </div>
  );
}
