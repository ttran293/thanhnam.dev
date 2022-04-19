import type { NextPage } from "next";
import HeadHelper from "../components/HeadHelper/HeadHelper";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import hello from "../public/images/hello.png";
import Layout from "../components/Layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.page}>
      <HeadHelper title="Home"></HeadHelper>

        <main className={styles.main}>
          <p className={styles.welcomeText}>
            Hello, im Nam. Welcome to my portfolio !
          </p>

          <div className={styles.illustrations}>
            <Image src={hello} width={300} height={300} alt={"Illustration"}/>
          </div>

          <div className={styles.wrapper}>
            <Link href="/about" passHref>
              <div className={styles.card}>
                <h2>About</h2>
              </div>
            </Link>

            <Link href="/now" passHref>
              <div className={styles.card}>
                <h2>Now</h2>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
