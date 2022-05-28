import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";

import LinkText from "./LinkText";

interface IBangon {
  status: string;
  info: string[];
}

interface IBangonProp {
  data: IBangon;
}

export default function Bangon({ data: { status, info } }: IBangonProp) {
  return (
    <Popover autoFocus={false}>
      <PopoverTrigger>
        <Text
          color="blackAlpha.700"
          as="span"
          _hover={{ textDecoration: "underline" }}
        >
          {status}
        </Text>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          {info.map((item: string) => (
            <LinkText text={item} />
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
