import { useChatStore } from "../store/useChatStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const onlineUsers = [];
  return <div>Sidebar</div>;
};

export default Sidebar;
