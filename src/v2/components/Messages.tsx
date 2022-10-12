import { useState, useEffect, useRef, useCallback } from "react";

import styled from "styled-components";
import Spinner from "./discord/Spinner";
import Message from "./discord/Message";

import { EChannels, IMessage } from "../types";

interface IMessagesProp {
  channel: EChannels;
}

export default function Messages({ channel }: IMessagesProp) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [before, setBefore] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [oldHeight, setOldHeight] = useState(0);
  const [oldScroll, setOldScroll] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const loading = useRef<HTMLDivElement>(null);

  const onIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && isLoaded) {
        setIsLoaded(false);
        const response = await fetch(
          `https://api.wakscord.xyz/messages/${channel}?before=${
            before ? before : ""
          }`
        );
        const msgs = await response.json();
        setMessages((prev) => [...msgs, ...prev]);
        setBefore(msgs[0].id);
        setIsLoaded(true);
        if (containerRef.current) {
          setOldHeight(containerRef.current.scrollHeight);
          setOldScroll(containerRef.current.scrollTop);
        }
      }
    },
    [isLoaded, before, channel]
  );

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.wakscord.xyz/messages/${channel}`
      );

      const msgs = await response.json();

      setMessages(msgs);
      setBefore(msgs[0].id);
      setIsLoaded(true);

      if (containerRef.current) {
        setOldHeight(containerRef.current.scrollHeight);
        setOldScroll(containerRef.current.scrollTop);
      }
    })();
  }, [channel]);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (loading.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });

      observer.observe(loading.current);
    }

    return () => observer && observer.disconnect();
  }, [loading, onIntersect]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight - oldHeight + oldScroll;
    }
  }, [oldHeight, oldScroll]);

  return (
    <Container ref={containerRef}>
      <Observer ref={loading}>
        <Spinner />
      </Observer>

      {messages.map((message, idx) => (
        <Message message={message} before={messages[idx - 1]} key={idx} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  background: #36393f;
  overflow-y: scroll;
`;

const Observer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 10vh;
`;
