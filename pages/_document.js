import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  return (
    <Html>
      <Head>
        <Script
          id="Adsense-id"
          data-ad-client="ca-pub-7006648733841921"
          async="true"
          strategy="beforeInteractive"
          crossorigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
        <script
          async
          crossorigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7006648733841921"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
