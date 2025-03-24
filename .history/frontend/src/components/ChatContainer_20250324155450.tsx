// components/ChatContainer.jsx
import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    listenToMessages,
    unlistenToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id); // Fetch initial messages
      listenToMessages(); // Start listening for new messages
      return () => unlistenToMessages(); // Cleanup on unmount or user change
    }
  }, [selectedUser, getMessages, listenToMessages, unlistenToMessages]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatDate = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const groupedMessages = messages.reduce((acc, msg) => {
    const msgDate = formatDate(msg.timestamp);
    if (!acc[msgDate]) acc[msgDate] = [];
    acc[msgDate].push(msg);
    return acc;
  }, {});

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col bg-gray-900 h-full">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  if (!selectedUser) return null;

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-full">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-900 to-gray-850">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <User className="w-12 h-12 mb-2 opacity-50" />
            <p>No messages yet. Say Hello!</p>
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, msgs], index) => (
            <div key={index}>
              <div className="text-center text-gray-400 text-sm my-4">
                <span className="px-3 py-1 bg-gray-800 rounded-md">{date}</span>
              </div>
              {msgs.map((msg, msgIndex) => (
                <div
                  key={msgIndex}
                  className={`flex items-end gap-2 mb-4 animate-fade-in ${
                    msg.senderId === authUser._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {msg.senderId !== authUser._id && (
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                      {selectedUser.profilePicture ? (
                        <img
                          src={selectedUser.profilePicture}
                          className="w-full h-full rounded-full object-cover"
                          alt="User"
                        />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                  )}
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm ${
                      msg.senderId === authUser._id
                        ? "bg-teal-600 text-white rounded-br-none"
                        : "bg-gray-700 text-gray-100 rounded-bl-none"
                    }`}
                  >
                    {msg.text && <p className="text-sm">{msg.text}</p>}
                    {msg.images && msg.images.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {msg.images.map((url, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={url}
                            className="max-w-full max-h-64 rounded-lg object-cover"
                            alt="Message"
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
