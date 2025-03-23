// components/ChatContainer.jsx
import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { User, Send, Paperclip, Phone, Info } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);
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
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div>
            <User />
            <p>No messages yet. Say Hello!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div>
              {msg.senderId !== authUser._id && (
                <div>
                  {selectedUser.profilePicture ? (
                    <img src={selectedUser.profilePicture} />
                  ) : (
                    <User />
                  )}
                </div>
              )}
              <div>
                {/*Text Messages*/}
                {msg.text && <p>{msg.text}</p>}
                {/*Image Messages*/}
                {msg.images && msg.images.length > 0 && (
                  <div>
                    {msg.images.map((url, imgIndex) => (
                      <img
                        src={url}
                        className="max-w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <MessageInput />
      {/* */}
    </div>
  );
};

export default ChatContainer;
