import styled from "styled-components";

import User from "./discord/User";

import { EStatus } from "../types";
import { ITEMS } from "../../v1/constants";

export default function Members() {
  const members = {
    [EStatus.STREAMING]: ["아이네", "징버거", "비챤"],
    [EStatus.ONLINE]: ["릴파", "주르르", "고세구"],
    [EStatus.OFFLINE]: ["우왁굳", "천양", "뢴트게늄"],
  };

  return (
    <Container>
      <Group>방송 중 — {members[EStatus.STREAMING].length}</Group>
      {members[EStatus.STREAMING].map((item, index) => (
        <User
          key={index}
          name={item}
          avatar={`https://api.wakscord.xyz/avatar/${ITEMS[item].id}.png`}
          status={EStatus.STREAMING}
          color={ITEMS[item].color}
          title="테스트"
        />
      ))}

      <Group>온라인 — {members[EStatus.ONLINE].length}</Group>
      {members[EStatus.ONLINE].map((item, index) => (
        <User
          key={index}
          name={item}
          avatar={`https://api.wakscord.xyz/avatar/${ITEMS[item].id}.png`}
          status={EStatus.ONLINE}
          color={ITEMS[item].color}
        />
      ))}

      <Group>오프라인 — {members[EStatus.OFFLINE].length}</Group>
      {members[EStatus.OFFLINE].map((item, index) => (
        <User
          key={index}
          name={item}
          avatar={`https://api.wakscord.xyz/avatar/${ITEMS[item].id}.png`}
          status={EStatus.OFFLINE}
          color={ITEMS[item].color}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  background: #2f3136;

  min-width: 240px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Group = styled.span`
  color: #96989d;
  font-size: 13px;
  font-weight: 700;

  width: 100%;

  margin-left: 30px;
  margin-top: 25px;
`;
