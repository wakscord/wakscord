import Content from "./components/Content";

import { EChannels } from "./types";

export default function App() {
  return (
    <div className="App">
      <Content channel={EChannels.woowakgood} />
    </div>
  );
}
