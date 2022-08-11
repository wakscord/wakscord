import React from "react";

import { ReactElement, useState, cloneElement } from "react";
import { Tooltip as UIToolTip } from "@chakra-ui/react";

interface ITooltipProp {
  label: string;
  children: ReactElement;
}

export default function Tooltip({ label, children }: ITooltipProp) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <UIToolTip hasArrow label={label} isOpen={open}>
      {cloneElement(children, {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onClick: () => setOpen(!open),
      })}
    </UIToolTip>
  );
}
