import { Fragment } from "react";

import styled, { css } from "styled-components";
import moment from "moment";
import "moment/locale/ko";

import Emoji from "./Emoji";
import Embed from "./Embed";
import { IMessage } from "../../types";

interface IDiscordMessageProp {
  message: IMessage;
  before: IMessage;
}

const emojiRegex = /(<a?:[a-zA-Z0-9]+:\d+>)/g;

export default function Message({ message, before }: IDiscordMessageProp) {
  const isCompact = message.data.username === before?.data.username;

  const content: Array<any> = [];

  message.data.content?.split(emojiRegex).forEach((element) => {
    const exec = emojiRegex.exec(element);

    if (exec) {
      content.push(<Emoji text={exec[1]} />);
    } else {
      content.push(<span>{element}</span>);
    }
  });

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
              {moment(message.sended_at).calendar()} • {message.count}채널
            </Info>
          </Header>
        </>
      )}

      <Content>
        {content.map((el, idx) => (
          <Fragment key={idx}>{el}</Fragment>
        ))}

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
  padding: 0 0 0 15px;

  ${(props) =>
    !props.isCompact &&
    css`
      margin-top: 1.0625rem;
      padding: 5px 0px 0 15px;
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
  line-height: 1.4rem;
  text-align: center;
  font-size: 0.75rem;
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