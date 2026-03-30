import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-6 w-full border-t border-[#B4A0FF]/25 bg-[#0a0f1c]/40 backdrop-blur-md">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </motion.button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full bg-[#080b12]/60 backdrop-blur-md border border-[#00F7FF]/30 rounded-full px-6 h-14 outline-none focus:bg-[#080b12]/80 focus:ring-2 focus:ring-[#00F7FF]/40 transition-all duration-500 shadow-[0_0_15px_rgba(0,247,255,0.05)] text-slate-200 placeholder:text-slate-500"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className={`hidden sm:flex btn btn-circle h-14 w-14 bg-slate-800/50 hover:bg-[#00F7FF]/20 border border-white/5 transition-all duration-500
                     ${imagePreview ? "text-[#00F7FF] shadow-[0_0_10px_rgba(0,247,255,0.3)]" : "text-slate-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={24} />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn btn-circle h-14 w-14 shadow-[0_0_15px_rgba(0,247,255,0.4)] bg-[#00F7FF] hover:bg-[#00E5FF] text-[#080b12] border-none transition-all duration-500"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={24} />
        </motion.button>
      </form>
    </div>
  );
};
export default MessageInput;