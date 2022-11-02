import styled from "styled-components";

import Channel from "./discord/Channel";

export default function Channels() {
  return (
    <Container>
      <Channel to="/v2/channels/ine">아이네</Channel>
      <Channel to="/v2/channels/jingburger">징버거</Channel>
      <Channel to="/v2/channels/lilpa">릴파</Channel>
      <Channel to="/v2/channels/jururu">주르르</Channel>
      <Channel to="/v2/channels/gosegu">고세구</Channel>
      <Channel to="/v2/channels/viichan">비챤</Channel>
      <Channel to="/v2/channels/woowakgood">우왁굳</Channel>
      <Channel to="/v2/channels/chunyang">천양</Channel>
      <Channel to="/v2/channels/roentgenium">뢴트게늄</Channel>
    </Container>
  );
}

const Container = styled.div`
  background: #2f3136;

  min-width: 240px;
  height: 100vh;
`;
