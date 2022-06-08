import { useState, useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { MultiSelect } from "react-multi-select-component";
import { AVAILABLE_ITEMS } from "../constants";

interface IChatConfigProp {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function ChatConfig({ isOpen, onClose }: IChatConfigProp) {
  const users =
    (JSON.parse(localStorage.getItem("users") ?? "null") as string[]) ??
    AVAILABLE_ITEMS;

  const [selected, setSelected] = useState(
    users.map((x) => {
      return { label: x, value: x };
    })
  );

  useEffect(() => {
    window.localStorage.setItem(
      "users",
      JSON.stringify(selected.map((x) => x.value))
    );
  }, [selected]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>채팅 설정</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <MultiSelect
            options={AVAILABLE_ITEMS.map((x) => {
              return { label: x, value: x };
            })}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
            overrideStrings={{
              allItemsAreSelected: "모두 선택됨",
              noOptions: "결과 없음",
              search: "검색",
              selectAll: "전체 선택하기",
              selectAllFiltered: "전체 선택 (검색)",
              selectSomeItems: "선택하기",
            }}
          />
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
