import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";
import { ChakraProvider } from "@chakra-ui/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import V1 from "./v1/App";
import V2 from "./v2/App";

ReactGA.initialize("G-9REMLTNZDT");
ReactGA.send("pageview");

const router = createBrowserRouter([
  {
    path: "/",
    element: <V1 />,
  },
  {
    path: "/v2/*",
    element: <V2 />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
