import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Radio, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-[#0b101e]/60 border-b border-[#B4A0FF]/25 fixed w-full top-0 z-40 
    backdrop-blur-[25px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-10 rounded-[1rem] bg-[#00F7FF]/15 flex items-center justify-center shadow-[0_0_15px_rgba(0,247,255,0.4)]">
                <Radio className="w-5 h-5 text-[#00F7FF]" />
              </div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F7FF] to-[#B4A0FF] tracking-wide">Pingify</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm bg-slate-800/50 hover:bg-[#00F7FF]/20 text-slate-300 hover:text-[#00F7FF] border border-white/5 hover:border-[#00F7FF]/50 shadow-[0_0_10px_rgba(0,247,255,0)] hover:shadow-[0_0_15px_rgba(0,247,255,0.3)] gap-2 transition-all duration-500 ease-in-out hover:scale-105 active:scale-95
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm bg-slate-800/50 hover:bg-[#00F7FF]/20 text-slate-300 hover:text-[#00F7FF] border border-white/5 hover:border-[#00F7FF]/50 shadow-[0_0_10px_rgba(0,247,255,0)] hover:shadow-[0_0_15px_rgba(0,247,255,0.3)] gap-2 transition-all duration-500 hover:scale-105 active:scale-95`}>
                  <User className="size-5" />
                  <span>Profile</span>
                </Link>

                <button className="flex gap-2 items-center hover:scale-105 active:scale-95 transition-all duration-500 text-slate-300 hover:text-[#00F7FF] bg-slate-800/50 hover:bg-[#00F7FF]/20 rounded-xl px-4 py-2 border border-white/5 hover:border-[#00F7FF]/50 shadow-[0_0_10px_rgba(0,247,255,0)] hover:shadow-[0_0_15px_rgba(0,247,255,0.3)]" onClick={logout}>
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;