import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const onlineUsers = [];
  useEffect(() => {
    getUsers();
  }, getUsers);
  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full">
      <div>
        <div>
          <Users />
          <span>Contacts</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
