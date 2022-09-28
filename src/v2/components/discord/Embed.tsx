import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import Text from './Text';
import { IDiscordEmbed } from '../../types';

interface IEmbedProp {
  embed: IDiscordEmbed;
}

export default function Embed({ embed }: IEmbedProp) {
  return (
    <Container borderColor={embed.color}>
      {embed.author && <Author>{embed.author.name}</Author>}
      <Title>{embed.title}</Title>
      {embed.description && (
        <Description>
          <Text>{embed.description}</Text>
        </Description>
      )}
      <ParentField>
        {embed.fields?.map((field, idx) => (
          <Field inline={field.inline} key={idx}>
            <FieldName>
              <Text>{field.name}</Text>
            </FieldName>
            <FieldValue>
              <Text>{field.value}</Text>
            </FieldValue>
          </Field>
        ))}
      </ParentField>
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
  font-size: 1rem;
  font-weight: 700;
  color: #00aff4;
  margin: 7px 0;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.span`
  display: block;
  font-size: 0.875rem;
  white-space: pre-wrap;
  font-weight: 400;
  margin-bottom: 2px;
`;

const ParentField = styled.div`
  display: grid;
  margin-top: 8px;
  grid-gap: 8px;
  grid-column: 1/1;
  grid-template-columns: repeat(auto-fill, minmax(128px, auto));
`;

const Field = styled.div<{ inline: boolean }>`
  display: flex;
  flex-direction: column;
  grid-auto-flow: row;
`;

const FieldName = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #dcddde;
`;

const FieldValue = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: #dcddde;
  white-space: pre-wrap;
`;

const Image = styled.img`
  margin: 16px 0;
  border-radius: 4px;

  max-width: 100%;
  height: auto;
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
`;
