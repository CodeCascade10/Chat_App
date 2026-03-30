import { Radio } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-transparent">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <motion.div
              className="w-24 h-24 rounded-[2.5rem] bg-[#00F7FF]/5 flex items-center justify-center border border-[#00F7FF]/20 backdrop-blur-md"
              animate={{ 
                y: [0, -20, 0],
                boxShadow: ["0 10px 30px rgba(0,247,255,0.05)", "0 20px 50px rgba(0,247,255,0.2)", "0 10px 30px rgba(0,247,255,0.05)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Radio className="w-12 h-12 text-[#00F7FF]" />
            </motion.div>
          </div>
        </div>

        {/* Welcome Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F7FF] to-[#B4A0FF] tracking-tight drop-shadow-[0_0_10px_rgba(0,247,255,0.2)]"
        >
          Welcome to Pingify!
        </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Select a conversation from the sidebar to start chatting
          </motion.p>
      </div>
    </div>
  );
};

export default NoChatSelected;