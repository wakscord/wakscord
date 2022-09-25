import styled, { css } from "styled-components";
import moment from "moment";
import "moment/locale/ko";

import { IMessage } from "../../types";

interface IDiscordMessageProp {
  message: IMessage;
  before: IMessage;
}

export default function Message({ message, before }: IDiscordMessageProp) {
  const isCompact = message.data.username === before?.data.username;

  return (
    <Container isCompact={isCompact}>
      {!isCompact && (
        <>
          <div style={{ height: "100%" }}></div>
          <Avatar src={message.data.avatar_url} />

          <Header>
            <Username>{message.data.username}</Username>
            <Info>
              {moment(message.sended_at).calendar()} • {message.count}채널
            </Info>
          </Header>
        </>
      )}

      <Content>{message.data.content}</Content>
    </Container>
  );
}

const Container = styled.div<{ isCompact: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;

  ${(props) =>
    !props.isCompact &&
    css`
      margin-top: 1.0625rem;
    `}

  &:hover {
    background: #32353b;
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

  padding-left: 55px;
`;

const Username = styled.span`
  color: white;
  font-weight: 500;
`;

const Info = styled.span`
  color: #a3a6aa;
  font-size: 0.8rem;
  margin-left: 0.4rem;
`;

const Content = styled.div`
  padding-left: 55px;
  color: white;
  font-weight: 300;
`;
