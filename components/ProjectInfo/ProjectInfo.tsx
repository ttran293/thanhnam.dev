import React, { useState } from "react";
import projects from "../../data/projects";
import styles from "./ProjectInfo.module.css";

export default function BackgroundInfo(props: any) {
  return (
    <div>
      {projects.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <a href={item.url}>Live</a> | <a href={item.github}>Source code</a>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
