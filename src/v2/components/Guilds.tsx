import styled from "styled-components";

export default function Guilds() {
  return (
    <Container>
      <Logo>
        <LogoImage src="/logo.png" alt="logo" />
      </Logo>
    </Container>
  );
}

const Container = styled.div`
  background: #202225;

  min-width: 72px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 12px;
`;

const Logo = styled.div`
  width: 60px;
  height: 60px;

  background: #36393f;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  width: 43px;
  height: 43px;
`;
