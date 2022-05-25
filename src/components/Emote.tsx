import { Image, Tooltip } from "@chakra-ui/react";

interface IEmoteProp {
  id: string;
  name: string;
}

export default function Emote({ id, name }: IEmoteProp) {
  return (
    <Tooltip hasArrow label={name} bg="gray.300" color="black">
      <Image
        src={`https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/light/3.0`}
        w={30}
        display="inline-block"
        verticalAlign="middle"
        marginRight={1}
      />
    </Tooltip>
  );
}
