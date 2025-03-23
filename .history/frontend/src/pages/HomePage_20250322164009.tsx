import React from "react";
import { usechatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser, users, isUsersLoading, getUsers } = usechatStore();
  return <div className="h-screen mt-20 bg-base-200">hi</div>;
};

export default HomePage;
