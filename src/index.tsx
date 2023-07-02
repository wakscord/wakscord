import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import V1 from "./v1/App";
import V2 from "./v2/App";

ReactGA.initialize("G-9REMLTNZDT");
ReactGA.send("pageview");

const router = createBrowserRouter([
  {
    path: "/",
    element: <V1 />,
    errorElement: (
      <div>
        초비ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ상!!!!!!!!!!!!!!! (대충 오류 발생했다는
        소리)
      </div>
    ),
  },
  {
    path: "/v2/channels/:channel",
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
