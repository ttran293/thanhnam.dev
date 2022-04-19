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
            Hello there. Welcome to my website!
          </p>

          <div className={styles.illustrations}>
            <Image src={hello} width={300} height={300} alt={"Illustration"} />
          </div>

          <div className={styles.wrapper}>
            <Link href="/about" passHref>
              <div className={styles.card}>
                <p>
                  I&apos;m a passionate full time Jr Software Developer @
                  MediaCybernetics, Inc and a hobbyist full stack web developer
                  based in Rockville, MD.
                </p>
                <p>
                  <mark className={styles.tag}>
                  {"👉"} Check out my projects!
                  </mark>
                </p>
              </div>
            </Link>

            <Link href="/now" passHref>
              <div className={styles.card}>
              <p>
                 {"👉"}  See what  I&apos;m doing right now.
                </p>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
