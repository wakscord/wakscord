import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";

import { IDiscordEmbed } from "../../types";

interface IEmbedProp {
  embed: IDiscordEmbed;
}

export default function Embed({ embed }: IEmbedProp) {
  return (
    <Container borderColor={embed.color}>
      {embed.author && <Author>{embed.author.name}</Author>}
      <Title>{embed.title}</Title>
      {embed.description && <Description>{embed.description}</Description>}
      {embed.fields?.map((field, idx) => (
        <Field inline={field.inline} key={idx}>
          <FieldName>{field.name}</FieldName>
          <FieldValue>{field.value}</FieldValue>
        </Field>
      ))}
      {embed.image && <Image src={embed.image.url} />}
      {embed.timestamp && (
        <Timestamp>{moment(embed.timestamp).calendar()}</Timestamp>
      )}
    </Container>
  );
}

const Container = styled.div<{ borderColor: number }>`
  margin-top: 5px;
  max-width: 432px;
  padding: 0.5rem 1rem 0.5rem 0.75rem;

  background-color: #2f3136;
  border-radius: 4px;
  border-left: 4px solid;
  border-color: #${(props) => props.borderColor.toString(16)};
`;

const Author = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #b9bbbe;
`;

const Title = styled.span`
  display: block;
  font-size: 1.125rem;
  font-weight: 500;
  color: #00aff4;
  margin: 0.25rem 0;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.span`
  display: block;
  font-size: 0.875rem;
  white-space: pre-wrap;
`;

const Field = styled.div<{ inline: boolean }>`
  display: flex;
  flex-direction: column;
`;

const FieldName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #dcddde;
`;

const FieldValue = styled.span`
  font-size: 14px;
  color: #dcddde;
  white-space: pre-wrap;
`;

const Image = styled.img`
  margin: 0.5rem 0;

  max-width: 100%;
  height: auto;
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
`;
