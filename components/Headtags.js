import Head from "next/head";
import Link from "next/link";

const Headtags = () => (
  <>
    {/*This is the head of the document we see in html */}
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="UTF-8" />
      {/* <link rel="icon" href="/favicon.png" sizes="16*16" type="image/png" /> */}

      {/* <link rel="stylesheet" type="text/css" href="/listMessages.css" />

      <link rel="stylesheet" type="text/css" href="/styles.css" /> */}
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Merienda:wght@400;700&family=Roboto:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Sarabun:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/*The CSS files are in the public folder 
         With Next.js, we can create a public folder in the root and then save some files there and refer to them by '/<filename>'*/}
      <title>FaeShare</title>
    </Head>
  </>
);
export default Headtags;
