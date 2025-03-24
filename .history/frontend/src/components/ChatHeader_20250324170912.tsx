import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

import { User, Phone, Info } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  if (!selectedUser) {
    return null;
  }
  return (
    <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 relative">
          {selectedUser.profilePicture ? (
            <img
              src={selectedUser.profilePicture}
              alt={selectedUser.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 ${
              onlineUsers.includes(selectedUser._id)
                ? "bg-green-500"
                : "bg-gray-500"
            } rounded-full border-2 border-gray-800`}
          ></span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">
            {selectedUser.fullName || selectedUser.email}
          </h2>
          <p className="text-xs text-gray-400">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "offline"}
          </p>
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
  );
};

export default ChatHeader;
