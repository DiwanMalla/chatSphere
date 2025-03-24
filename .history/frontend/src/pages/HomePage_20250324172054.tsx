import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore"; // Assuming you have this for auth

import { useNavigate } from "react-router-dom";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const { selectedUser, getUsers } = useChatStore();
  const { authUser } = useAuthStore(); // For user authentication
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      getUsers(); // Fetch users when authenticated
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [authUser, getUsers, navigate]);

  return (
    <div className="h-screen bg-base-200 flex flex-col">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          {" "}
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {/* Right Panel - Chat or Welcome Message */}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
