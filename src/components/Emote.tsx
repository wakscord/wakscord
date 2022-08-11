import { Image } from "@chakra-ui/react";
import Tooltip from "./Tooltip";

interface IEmoteProp {
  id: string;
  name: string;
}

export default function Emote({ id, name }: IEmoteProp) {
  return (
    <Tooltip label={name}>
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
