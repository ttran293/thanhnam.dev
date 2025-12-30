import Head from "next/head";
import React from "react";


export default function HeadHelper({title}:any){
    return (
      <Head>
          <title>{title? title : 'Portfolio'} | Nam</title>
          <meta name="description" content="Thanh Nam Tran Portfolio" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
