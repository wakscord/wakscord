import styled from "styled-components";

import { Link } from "react-router-dom";

import ChannelIcon from "./icons/Channel";

interface IChannelProps {
  to: string;
  children: React.ReactNode;
}

export default function Channel({ to, children }: IChannelProps) {
  return (
    <Link to={to}>
      <Container>
        <ChannelIcon size={20} />
        <Name>{children}</Name>
      </Container>
    </Link>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 6px;

  border-radius: 4px;
  margin: 5px;

  &:hover {
    background: #3c3f44;
  }
`;

const Name = styled.span`
  margin-left: 5px;
  color: #96989d;
`;
