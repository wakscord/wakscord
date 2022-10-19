import styled from "styled-components";
import { useParams } from "react-router-dom";

import Guilds from "./components/Guilds";
import Channels from "./components/Channels";
import Content from "./components/Content";

import { EChannels } from "./types";

export default function App() {
  const params = useParams<{ channel: EChannels }>();

  return (
    <div className="App">
      <Container>
        <Guilds />
        <Channels />
        <Content channel={params.channel ?? EChannels.woowakgood} />
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
`;
