import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-transparent flex flex-col pt-24 px-6 pb-8">
      <div className="flex-1 w-full max-w-7xl mx-auto bg-[#0a0f1c]/50 backdrop-blur-[25px] border border-[#B4A0FF]/25 shadow-[0_0_40px_rgba(180,160,255,0.05)] rounded-[2.5rem] overflow-hidden flex transition-all duration-500 ease-in-out">
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};
export default HomePage;