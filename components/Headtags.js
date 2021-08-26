import Head from "next/head";

const HeadTags = () => (
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
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto&display=swap"
        rel="stylesheet"
      />

      {/*The CSS files are in the public folder 
         With Next.js, we can create a public folder in the root and then save some files there and refer to them by '/<filename>'*/}
      <title>FaeShare</title>
    </Head>
  </>
);
export default HeadTags;
