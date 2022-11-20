import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&amp;display=swap"
            rel="stylesheet"
          />

          <title>NFT Launchpad - VCGamers</title>
          {/* <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link> */}
          {/* <link rel="shortcut icon" href="/ransverse/images/favicon.ico" /> */}
         
          {/* 
          <link rel="canonical" href="https://ransverse.vcgamers.com"></link>
          <meta
            name="description"
            content="Welcome to RansVerse the First Metaverse that Interconnects Digital Spaces in Indonesia"></meta> */}
          {/* <meta property="og:url" content="https://ransverse.vcgamers.com" key="ogurl" />
          <meta property="og:image" content="/ransverse/images/logo/og_image.png" key="ogimage" />
          <meta
            property="og:site_name"
            content="RansVerse powered by VCGamers &amp; ShintaVR"
            key="ogsitename"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="RansVerse powered by VCGamers &amp; ShintaVR"
            key="ogtitle"
          />
          <meta
            property="og:description"
            content="Welcome to RansVerse the First Metaverse that Interconnects Digital Spaces in Indonesia"
            key="ogdesc"
          /> */}

          {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=UA-197594260-2`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-197594260-2');
        `
            }}
          /> */}
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
