import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>

          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap" rel="stylesheet" />
          </head>
          <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Nanum+Gothic+Coding&family=Oswald:wght@500;600;700&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap" rel="stylesheet" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/favicon-16x16.png" type="image/png" />
          <link rel="icon" href="/favicon-32x32.png" type="image/png" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link
          rel="preload"
          href="/reference/NightsTree.webp"
          as="image"
          type="image/webp"
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
