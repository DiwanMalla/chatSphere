import React from "react";
import { useChatStore } from "../store/useChatStore";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading } = useChatStore();
  return <div>ChatContainer</div>;
};

export default ChatContainer;
