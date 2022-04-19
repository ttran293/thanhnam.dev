import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import BackgroundInfo from "../components/BackgroundInfo/BackgroundInfo";
import ProjectInfo from "../components/ProjectInfo/ProjectInfo";
import HeadHelper from "../components/HeadHelper/HeadHelper";
import Slider from "../components/Slider/Slider";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import find from "../public/images/find.png";
import load from "../public/images/load.png";
import working from "../public/images/working.png";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <HeadHelper title="About"></HeadHelper>
        <Header></Header>

        <div className={styles.main}>
          <h1 className={styles.title}>About Nam</h1>
          <div className={styles.illustrations}>
            <Image src={find} width={200} height={200} alt={"Illustration"}/>
          </div>
          <Slider></Slider>
        </div>

        <div className={styles.main}>
          <h1 className={styles.title}>Education and Career</h1>
          <div className={styles.illustrations}>
            <Image src={load} width={200} height={200} alt={"Illustration"}/>
          </div>
          <BackgroundInfo></BackgroundInfo>
        </div>

        <div className={styles.main}>
          <h1 className={styles.title}>Projects</h1>
          <div className={styles.illustrations}>
            <Image src={working} width={200} height={200} alt={"Illustration"}/>
          </div>
          <ProjectInfo></ProjectInfo>
        </div>
        <a href="#top">Back to top</a>
        <hr style={{ width: "100%" }}></hr>
        <footer className={styles.footer}>Copyright © Nam</footer>
      </div>
    </Layout>
  );
};

export default About;
