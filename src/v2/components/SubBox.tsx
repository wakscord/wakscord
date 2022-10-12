import styled from "styled-components";

export default function SubBox() {
  return (
    <Container>
      <Box>
        <span>모시깽이 모시깽</span>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  background: #36393f;
`;

const Box = styled.div`
  background: #202225;
  color: white;

  margin: 15px;
  padding: 10px;

  border-radius: 5px;
`;
