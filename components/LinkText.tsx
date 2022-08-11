import React from "react";

const regexMdLinks = /\[([^[]+)\](\(.*\))/gm;
const singleMatch = /\[([^[\]]*)\]\((.*?)\)/;

interface ILinkTextProp {
  text: string;
}

export default function LinkText({ text }: ILinkTextProp) {
  let result = text;

  const matches = text.match(regexMdLinks);
  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      const data = singleMatch.exec(matches[i]);

      if (data) {
        result = result.replace(
          data[0],
          `<a style="color: #2f7dfb" href="${data[2]}" target="_blank">${data[1]}</a>`
        );
      }
    }
  }

  return <div dangerouslySetInnerHTML={{ __html: result }} />;
}
