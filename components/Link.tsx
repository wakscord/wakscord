import React from "react";

import { Link as UILink } from "@chakra-ui/react";

interface ILinkProp {
  href: string;
  children: React.ReactNode;
}

export default function Link({ href, children }: ILinkProp) {
  return (
    <UILink href={href} color="#146eff" target="_blank">
      {children}
    </UILink>
  );
}
