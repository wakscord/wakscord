import styled, { keyframes } from "styled-components";

export default function Spinner() {
  return (
    <Inner>
      <Cube />
      <Cube />
    </Inner>
  );
}

const Animation = keyframes`
  25% {
    transform: translateX(22px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(22px) translateY(22px) rotate(-180deg);
  }
  75% {
    transform: translateX(0) translateY(22px) rotate(-270deg) scale(0.5);
  }
  to {
    transform: rotate(-1turn);
  }
`;

const Inner = styled.div`
  position: relative;
  display: inline-block;
  width: 32px;
  height: 32px;
  contain: paint;
`;

const Cube = styled.div`
  background-color: #7983f5;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${Animation} 1.8s ease-in-out infinite;

  &:last-child {
    animation-delay: -0.9s;
  }
`;
