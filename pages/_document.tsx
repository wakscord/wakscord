import React from "react";

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href="https://wakscord.xyz/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="왁스코드" />
        <meta name="og:description" content="디스코드에서 왁타버스 만나보기" />
        <meta name="theme-color" content="#7EB49F" />
        <meta property="og:image" content="https://wakscord.xyz/logo.png" />

        <title>왁스코드</title>

        <link
          href="https://cdn.jsdelivr.net/gh/JellyBrick/SeguFont/SeguSegu-Regular.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
