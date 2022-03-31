import React, { useState } from "react";
import projects from "../../data/projects";
import styles from "./ProjectInfo.module.css";

export default function ProjectInfo(props: any) {
  return (
    <div>
      {projects.map((item) => (
        <div key={item.id}>
          <mark className={styles.tag}>{item.name}</mark>
          <br />
          <a className={styles.live} href={item.url}>Live</a> | <a className={styles.live} href={item.github}>Source code</a>
          <p className={styles.description}>{item.description}<br></br>
          {item.tech}
          </p>
        </div>
      ))}
    </div>
  );
}
