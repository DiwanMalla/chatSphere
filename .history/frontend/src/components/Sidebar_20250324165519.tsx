import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlyOnline, setShowOnlyOnline] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  // Filter and sort users
  let filteredUsers = [...users];
  if (showOnlyOnline) {
    filteredUsers = filteredUsers.filter((user) =>
      onlineUsers.includes(user._id)
    );
  }

  const sortedUsers = filteredUsers.sort((a, b) => {
    const aIsOnline = onlineUsers.includes(a._id);
    const bIsOnline = onlineUsers.includes(b._id);
    return bIsOnline - aIsOnline;
  });

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-700 bg-gray-800 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-gray-700 w-full p-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-teal-400" />
          <span className="font-medium text-white hidden lg:block">
            Contacts
          </span>
        </div>
        <span className="text-sm text-gray-400 hidden lg:block">
          {users.length} total
        </span>
      </div>

      {/* Show Only Online Checkbox */}
      <div className="px-5 py-2 flex items-center gap-2">
        <input
          type="checkbox"
          id="showOnline"
          checked={showOnlyOnline}
          onChange={() => setShowOnlyOnline(!showOnlyOnline)}
          className="w-4 h-4"
        />
        <label htmlFor="showOnline" className="text-sm text-gray-300">
          Show only online users
        </label>
        <span className="text-sm mr-4 text-gray-400 hidden lg:block">
          {onlineUsers.length - 1} total
        </span>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3 flex-1">
        {sortedUsers.length === 0 ? (
          <p className="text-gray-400 text-center mt-4">No contacts found</p>
        ) : (
          sortedUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-3 text-left transition-colors relative ${
                selectedUser?._id === user._id
                  ? "bg-teal-600 text-white ring-1 ring-base-300"
                  : onlineUsers.includes(user._id)
                  ? "bg-gray-800 text-gray-100 ring-1 ring-green-500 hover:bg-gray-700"
                  : "bg-gray-900 text-gray-200 hover:bg-gray-700"
              }`}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 relative">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.fullName || user.email}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <span className="truncate hidden lg:block font-medium">
                  {user.fullName || user.email}
                </span>
                <div className="hidden lg:block text-left">
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
