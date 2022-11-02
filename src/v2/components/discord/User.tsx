import styled from "styled-components";

import Avatar from "./Avatar";

import { EStatus } from "../../types";

interface IUserProp {
  name: string;
  avatar: string;
  status: EStatus;
  color: string;
  title?: string;
}

export default function User({
  name,
  avatar,
  status,
  color,
  title,
}: IUserProp) {
  return (
    <Container offline={status === EStatus.OFFLINE}>
      <Avatar image={avatar} status={status} />
      <Texts>
        <Name textColor={color}>{name}</Name>
        {title && (
          <Description>
            <b>{title}</b> 방송 중
          </Description>
        )}
      </Texts>
    </Container>
  );
}

const Container = styled.div<{ offline: boolean }>`
  width: 224px;
  height: 42px;
  border-radius: 5px;
  padding: 1px 8px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  cursor: pointer;
  user-select: none;

  &:hover {
    background: #3d3f44;
    opacity: 1 !important;
  }

  ${({ offline }) => offline && `opacity: .3;`}
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  margin-top: 3px;
`;

const Name = styled.span<{ textColor: string }>`
  font-size: 16px;
  line-height: 16px;
  color: ${({ textColor }) => textColor};

  vertical-align: bottom;
`;

const Description = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: #96989d;

  vertical-align: bottom;
`;
