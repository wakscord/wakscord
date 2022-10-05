import { Fragment } from "react";

import styled, { css } from "styled-components";
import moment from "moment";
import "moment/locale/ko";

import Text from "./Text";
import Embed from "./Embed";
import { IMessage } from "../../types";

interface IDiscordMessageProp {
  message: IMessage;
  before: IMessage;
}

export default function Message({ message, before }: IDiscordMessageProp) {
  const isCompact = message.data.username === before?.data.username;

  return (
    <Container isCompact={isCompact}>
      {isCompact ? (
        <HoverInfo>{moment(message.sended_at).format("a h:mm")}</HoverInfo>
      ) : (
        <>
          <Avatar src={message.data.avatar_url} />

          <Header>
            <Username>{message.data.username}</Username>
            <Info>
              {new Date().getTime() - new Date(message.sended_at).getTime() >
              24 * 60 * 60 * 1000
                ? moment(message.sended_at).format("yyyy.MM.DD.")
                : moment(message.sended_at).calendar()}{" "}
              • {message.count}채널
            </Info>
          </Header>
        </>
      )}

      <Content>
        {message.data.content && <Text>{message.data.content}</Text>}

        {message.data.embeds?.map((embed, idx) => (
          <Embed embed={embed} key={idx} />
        ))}
      </Content>
    </Container>
  );
}

const Container = styled.div<{ isCompact: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 15px;

  background: #36393f;

  ${(props) =>
    !props.isCompact &&
    css`
      margin-top: 1.0625rem;
      padding: 5px 20px 0 15px;
    `}

  &:hover {
    background: #32353b;
  }
`;

const HoverInfo = styled.div`
  position: absolute;

  left: 0;

  width: 73px;
  height: 1.375rem;
  line-height: 1.3rem;
  text-align: center;
  font-size: 0.7rem;
  color: #b9bbbe;

  opacity: 0;

  ${Container}:hover & {
    opacity: 1;
  }
`;

const Avatar = styled.img`
  position: absolute;
  margin-top: calc(4px - 0.125rem);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  pointer-events: none;
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  padding-left: 58px;
`;

const Username = styled.span`
  color: white;
  font-weight: 500;
`;

const Info = styled.span`
  color: #a3a6aa;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const Content = styled.div`
  padding-left: 58px;
  color: white;
  font-weight: 300;
`;
