import { useState } from "react";
import styled from "styled-components";

import Messages from "./Messages";
import Members from "./Members";
import SubBox from "./SubBox";
import Channel from "./discord/icons/Channel";
import MembersIcon from "./discord/icons/Members";

import { EChannels } from "../types";

interface IContentProp {
  channel: EChannels;
}

export default function Content({ channel }: IContentProp) {
  const [activeMembers, setActiveMembers] = useState(true);

  return (
    <Container>
      <Header>
        <ChannelIconWrapper>
          <Channel />
        </ChannelIconWrapper>
        <h1>{channel}</h1>

        <Buttons>
          <div onClick={() => setActiveMembers(!activeMembers)}>
            <MembersIcon active={activeMembers} />
          </div>
        </Buttons>
      </Header>
      <ContentContainer>
        <MessagesContainer>
          <Messages channel={channel} />
          <SubBox />
        </MessagesContainer>

        {activeMembers && <Members />}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
`;

const Header = styled.div`
  min-height: 48px;
  display: flex;
  align-items: center;
  padding: 0 8px;

  background: #36393f;
  color: white;

  z-index: 100;

  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);
`;

const ChannelIconWrapper = styled.div`
  margin: 0 8px;
`;

const Buttons = styled.div`
  margin-left: auto;
  margin-right: 8px;
`;

const ContentContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;
