import { MessageSquare } from "lucide-react";
import React from "react";

const NoChatSelected = () => {
  return (
  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
    <MessageSquare className="w-16 h-16 text-teal-400 mb-4" />
    <h2 className="text-3xl font-bold text-white mb-2">
      Welcome to ChatSphere
    </h2>
    <p className="text-lg text-gray-400 max-w-md">
      Select a user from the left to start chatting. Connect with
      friends securely and instantly!
    </p>
  </div>;
)};

export default NoChatSelected;
