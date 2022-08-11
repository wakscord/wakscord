import React from "react";
import ReactGA from "react-ga4";
import { ChakraProvider } from "@chakra-ui/react";

import "../css/App.css";
import "../css/Card.css";

ReactGA.initialize("G-9REMLTNZDT");
ReactGA.send("pageview");

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
