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
          
          <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
