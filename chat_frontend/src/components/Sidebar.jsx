import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-[#B4A0FF]/25 flex flex-col transition-all duration-500 bg-[#0a0f1c]/40">
      <div className="border-b border-[#B4A0FF]/25 w-full p-6">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 scrollbar-hide">
        {filteredUsers.map((user, idx) => (
          <motion.button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full p-4 flex items-center gap-4
              hover:bg-[#00F7FF]/10 transition-all duration-500 ease-in-out rounded-2xl mx-3
              ${selectedUser?._id === user._id ? "bg-[#00F7FF]/15 shadow-[0_0_20px_rgba(0,247,255,0.15)] ring-1 ring-[#00F7FF]/60" : "border-l-4 border-transparent"}
            `}
            style={{ width: 'calc(100% - 24px)' }}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-14 object-cover rounded-[1.5rem] shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              />
              {onlineUsers.includes(user._id) && (
                <motion.span
                  animate={{ opacity: [1, 0.6, 1], boxShadow: ["0 0 10px #00F7FF", "0 0 25px #00F7FF", "0 0 10px #00F7FF"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -bottom-1 -right-1 size-4 bg-[#00F7FF] 
                  rounded-full ring-2 ring-[#0b101e]"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </motion.button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;