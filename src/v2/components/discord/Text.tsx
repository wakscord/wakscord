import { Fragment } from 'react';

import styled, { css } from 'styled-components';
import Emoji, { EmojiImage } from './Emoji';

interface ITextProp {
  children: string;
}

const formatRegex = /(<a?:[a-zA-Z0-9]+:\d+>)|(\*\*.+\*\*)|(:[a-zA-Z0-9_]+:)/g;

export default function Text({ children }: ITextProp) {
  const content: Array<any> = [];
  let bigEmoji = true;

  // console.log(
  //   children,
  //   children.split(formatRegex).filter((x) => x)
  // );

  children
    .split(formatRegex)
    .filter((x) => x)
    .forEach((element) => {
      const exec =
        /(<a?:[a-zA-Z0-9]+:\d+>)|(\*\*.+\*\*)|(:[a-zA-Z0-9_]+:)/g.exec(element);

      if (!exec) {
        content.push(<span>{element}</span>);

        if (element !== ' ') bigEmoji = false;
      } else if (exec[1]) {
        content.push(<Emoji text={exec[1]} />);
      } else if (exec[2]) {
        content.push(<strong>{element.slice(2, -2)}</strong>);
      } else if (exec[3]) {
        content.push(<Emoji text={element.slice(1, -1)} />);
      }
    });

  return (
    <Content small={!bigEmoji}>
      {content.map((el, idx) => (
        <Fragment key={idx}>{el}</Fragment>
      ))}
    </Content>
  );
}

const Content = styled.div<{ small: boolean }>`
  color: white;
  font-size: 0.875rem;

  ${(props) =>
    props.small &&
    css`
      ${EmojiImage} {
        width: 18px !important;
        height: 18px !important;
        margin-top: -3px;
      }
    `}
`;
