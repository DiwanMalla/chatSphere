import React from "react";
import { usechatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser, users, isUsersLoading, getUsers } = usechatStore();
  return <div className="min-h-screen mt-20">hi</div>;
};

export default HomePage;
