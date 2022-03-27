import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.page}>
      <Head>
        <title>Home | Nam</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.welcome}>
          Welcome to{" "}
          <a href="https://www.linkedin.com/in/thanh-nam-tran/">Nam</a>{" "}
          portfolio !
        </h1>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <Link href="/about">
              <div>
                <h2>About &rarr;</h2>
                <p>background, education, and projects</p>
              </div>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/now">
              <div>
                <h2>Now &rarr;</h2>
                <p>what I focus on at the moment</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
