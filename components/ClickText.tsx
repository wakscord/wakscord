import React from "react";

import { Text } from "@chakra-ui/react";

interface IClickTextProp {
  children: React.ReactNode;
  onClick: () => void;
}

export default function ClickText({ children, onClick }: IClickTextProp) {
  return (
    <Text
      color="#146eff"
      cursor="pointer"
      _hover={{
        textDecoration: "underline",
      }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
}
