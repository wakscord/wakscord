import Content from "./components/Content";

import { useParams } from "react-router-dom";

import { EChannels } from "./types";

export default function App() {
  const params = useParams<{ channel: EChannels }>();

  return (
    <div className="App">
      <Content channel={params.channel ?? EChannels.woowakgood} />
    </div>
  );
}
