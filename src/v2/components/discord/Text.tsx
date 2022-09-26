import { Fragment } from "react";

import styled from "styled-components";
import Emoji from "./Emoji";

interface ITextProp {
  children: string;
}

const emojiRegex = /(<a?:[a-zA-Z0-9]+:\d+>)/g;

export default function Text({ children }: ITextProp) {
  const content: Array<any> = [];
  let isText = true;

  children.split(emojiRegex).forEach((element) => {
    const exec = emojiRegex.exec(element);

    if (!exec) {
      content.push(<span>{element}</span>);
    } else {
      isText = false;
      content.push(<Emoji text={exec[1]} small={isText} />);
    }
  });

  return (
    <Content>
      {content.map((el, idx) => (
        <Fragment key={idx}>{el}</Fragment>
      ))}
    </Content>
  );
}

const Content = styled.div`
  color: white;
  font-weight: 300;
`;
