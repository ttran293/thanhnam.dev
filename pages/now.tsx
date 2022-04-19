import type { NextPage } from "next";
import HeadHelper from "../components/HeadHelper/HeadHelper";
import styles from "../styles/Home.module.css";
import Header from "../components/Header/Header";
import Image from "next/image";
import music from "../public/images/music.png";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
const Now: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
      <HeadHelper title="Now"></HeadHelper>
        <div className={styles.main}>
          <Header></Header>
          <h1 className={styles.title}>What I am up to</h1>
          <ul className={styles.description}>
            <li>Currently in Silver Spring, MD</li>
            <li>
              A full-time software developer at{" "}
              <a className={styles.link} href="https://www.mediacy.com/"><mark className={styles.tag}>Media Cybernetics Inc</mark></a>{" "}
              working on microscopy cameras and image analysis (and building
              awesome data visualization with PowerBI).
            </li>
            <li>Interest in making web-app with friends</li>
            <li>Up next: learn Flutter mobile-app development</li>
            <li>Listening to 🎧 Mac Miller, Keshi, and hidden indie gems.</li>
          </ul>
          <div className={styles.illustrations}>
            <Image src={music} width={300} height={300}  alt={"Illustration"}/>
          </div>
          <p className={styles.description}>
            Find me at <a href="https://github.com/ttran293">GitHub   </a>
            <a href="https://www.linkedin.com/in/thanh-nam-tran-9bbb921b3/">
               LinkedIn
            </a>
          </p>
        </div>
        <hr style={{ width: "100%" }}></hr>
        <Footer></Footer>
      </div>
    </Layout>
  );
};

export default Now;
