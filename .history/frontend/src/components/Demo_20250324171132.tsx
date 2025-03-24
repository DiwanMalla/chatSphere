// components/ChatContainer.jsx
import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { User, Send, Paperclip, Phone, Info } from "lucide-react";

const ChatContainer = () => {
  const { selectedUser, messages, sendMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = e.currentTarget.message.value.trim();
    if (text) {
      sendMessage(text); // Check the function definition to ensure it expects one or two arguments
      e.currentTarget.message.value = "";
    }
  };

  if (!selectedUser) return null;

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-full">
      {/* Chat Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 relative">
            {selectedUser.profilePicture ? (
              <img
                src={selectedUser.profilePicture}
                alt={selectedUser.fullName || selectedUser.email}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              {selectedUser.fullName || selectedUser.email}
            </h2>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-2 text-gray-300 hover:text-teal-400 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-300 hover:text-teal-400 transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-850">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <User className="w-12 h-12 mb-2 opacity-50" />
            <p>No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 mb-4 animate-fade-in ${
                msg.senderId === authUser._id ? "justify-end" : "justify-start"
              }`}
            >
              {msg.senderId !== authUser._id && (
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                  {selectedUser.profilePicture ? (
                    <img
                      src={selectedUser.profilePicture}
                      alt={selectedUser.fullName || selectedUser.email}
                      className="w-full h-full rounded-full object-cover"
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
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs text-gray-400 mt-1 block">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="bg-gray-800 p-3 border-t border-gray-700 flex items-center gap-2"
      >
        <button
          type="button"
          className="p-2 text-gray-300 hover:text-teal-400 transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          name="message"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-full text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
          autoComplete="off"
        />
        <button
          type="submit"
          className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
