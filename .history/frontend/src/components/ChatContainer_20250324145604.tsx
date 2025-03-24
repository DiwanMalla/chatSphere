import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to format date headers
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

  // Group messages by date
  const groupedMessages = messages.reduce((acc, msg) => {
    const msgDate = formatDate(msg.createdAt);
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

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-full">
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages Area with Scroll */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <User size={40} />
            <p>No messages yet. Say Hello!</p>
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, msgs], index) => (
            <div key={index}>
              {/* Date Separator */}
              <div className="text-center text-gray-400 text-sm my-3">
                <span className="px-3 py-1 bg-gray-800 rounded-md">{date}</span>
              </div>

              {/* Messages */}
              {msgs.map((msg, msgIndex) => (
                <div key={msgIndex} className="flex items-start space-x-2">
                  {/* Profile Picture for Other Users */}
                  {msg.senderId !== authUser._id && (
                    <div>
                      {selectedUser.profilePicture ? (
                        <img
                          src={selectedUser.profilePicture}
                          className="w-10 h-10 rounded-full"
                          alt="User"
                        />
                      ) : (
                        <User className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className="bg-gray-800 p-3 rounded-lg max-w-md">
                    {/* Text Messages */}
                    {msg.text && <p className="text-white">{msg.text}</p>}

                    {/* Image Messages */}
                    {msg.images && msg.images.length > 0 && (
                      <div className="mt-2">
                        {msg.images.map((url, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={url}
                            className="max-w-full rounded-lg object-cover"
                            alt="Message"
                          />
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
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
        {/* Auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
