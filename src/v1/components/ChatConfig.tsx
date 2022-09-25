import { useState, useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
} from "@chakra-ui/react";

import { MultiSelect } from "react-multi-select-component";
import { AVAILABLE_ITEMS } from "../constants";

interface IChatConfigProp {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function ChatConfig({ isOpen, onClose }: IChatConfigProp) {
  const excludes = JSON.parse(
    localStorage.getItem("excludes") ?? "[]"
  ) as string[];

  const users = AVAILABLE_ITEMS.filter((x) => !excludes.includes(x)) ?? [];

  const [selected, setSelected] = useState(
    users.map((x) => {
      return { label: x, value: x };
    })
  );

  useEffect(() => {
    const sel = selected.map((y) => y.value);

    window.localStorage.setItem(
      "excludes",
      JSON.stringify(AVAILABLE_ITEMS.filter((x) => !sel.includes(x)))
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

          <Checkbox
            mt={3}
            defaultChecked={!Boolean(localStorage.getItem("noSegu"))}
            onChange={(e) => {
              if (e.target.checked) localStorage.removeItem("noSegu");
              else localStorage.setItem("noSegu", "true");
            }}
          >
            세구님의 채팅에 세구세구체 적용
          </Checkbox>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
