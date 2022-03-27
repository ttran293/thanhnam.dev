import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Now: NextPage = () => {
  const breadcrumbs = [
    <Link href="/" key="1">
      Home
    </Link>,
    <Link href="/about" key="2">
      About
    </Link>,
    <Link href="/now" key="3">
      Now
    </Link>,
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Now | Nam</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
        <h1 className={styles.title}>What I am up to</h1>
        <ul className={styles.description}>
          <li>Currently in Silver Spring, MD, US</li>
          <li>A full-time software developer @ Media Cybernetics Inc</li>
          <li>Focused on making web-app with friends</li>
          <li>Up Next: learn Flutter mobile-app development</li>
          <li>Listening to 🎧 Mac Miller, Keshi, and hidden indie gems.</li>
        </ul>
        <p className={styles.description}>Find me at @Github @LinkedIn</p>
      </div>
      <hr style={{ width: "100%" }}></hr>
      <footer className={styles.footer}>Copyright © Nam</footer>
    </div>
  );
};

export default Now;
