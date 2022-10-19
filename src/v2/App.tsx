import styled from "styled-components";

import Content from "./components/Content";

import { useParams } from "react-router-dom";

import { EChannels } from "./types";
import Channels from "./components/Channels";

export default function App() {
  const params = useParams<{ channel: EChannels }>();

  return (
    <div className="App">
      <Container>
        <Channels />
        <Content channel={params.channel ?? EChannels.woowakgood} />
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
`;
