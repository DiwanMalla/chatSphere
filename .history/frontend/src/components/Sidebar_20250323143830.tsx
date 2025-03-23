// components/Sidebar.jsx
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, User } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const onlineUsers = [];
  useEffect(() => {
    getUsers();
  }, [getUsers]); // Fixed dependency array with []

  if (isUsersLoading) return <SidebarSkeleton />;

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
        {/* Online Users Count (Placeholder) */}
        <span className="text-sm text-gray-400 hidden lg:block">
          {users.length} total
        </span>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3 flex-1">
        {users.length === 0 ? (
          <p className="text-gray-400 text-center mt-4">No contacts found</p>
        ) : (
          users.map((user) => (
            <div>
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-3  text-left transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-teal-600 text-white ring-1 ring-base-300"
                  : "hover:bg-gray-700 text-gray-200"
              }`}
            >
              
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.fullName || user.email}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>
              <span className="truncate hidden lg:block">
                {user.fullName || user.email}
              </span>
              </div>
              {/*User info - onlu visible on larger screens*/}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">
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
