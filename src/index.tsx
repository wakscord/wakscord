import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

ReactGA.initialize("G-9REMLTNZDT");
ReactGA.send("pageview");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
