
import React, { useState } from 'react';
import { LogIn, User, ShieldCheck, Zap, Mail } from 'lucide-react';
import { UserSession } from '../types';

interface LoginGateProps {
  onLogin: (user: UserSession) => void;
}

const LoginGate: React.FC<LoginGateProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleRedirect = () => {
    setLoading(true);
    // Redirect to real Google Sign In page
    // In a production app, this would be an OAuth initiation URL
    window.location.href = "https://accounts.google.com/signin";
  };

  const handleMockLogin = () => {
    setLoading(true);
    // Simulate successful login for the session
    setTimeout(() => {
      const mockUser: UserSession = {
        name: 'Authorized User',
        email: 'user@thekore.ai',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kore',
        isLoggedIn: true
      };
      localStorage.setItem('thekore_session', JSON.stringify(mockUser));
      onLogin(mockUser);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2048')] bg-cover" />
      
      <div className="relative w-full max-w-md p-10 rounded-[3rem] bg-white text-gray-900 shadow-2xl animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-black rounded-[2rem] mx-auto flex items-center justify-center mb-6 shadow-2xl transition-transform hover:rotate-12 duration-500">
            <Zap className="text-white fill-white" size={48} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic">THEKORE<span className="font-light opacity-30">OS</span></h1>
          <p className="text-gray-400 mt-2 font-semibold uppercase tracking-widest text-[10px]">Neural Intelligence Workspace</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleRedirect}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 py-5 px-6 border-2 border-gray-100 rounded-3xl hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50 group"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="G" />
                <span className="font-bold text-lg">Sign Up with Google</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button 
            onClick={handleMockLogin}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-3xl bg-black text-white hover:bg-gray-800 transition-all active:scale-95 font-black uppercase tracking-widest text-xs"
          >
            <LogIn size={16} /> Log In with Core ID
          </button>
        </div>

        <p className="mt-10 text-[9px] text-center text-gray-400 uppercase tracking-widest px-8 leading-relaxed font-medium">
          Secure kernel initialization required. By proceeding you authorize end-to-end encryption protocols.
        </p>

        <div className="mt-12 flex justify-center gap-10 opacity-20">
          <ShieldCheck size={20} className="hover:opacity-100 cursor-help" />
          <User size={20} className="hover:opacity-100 cursor-help" />
          <Mail size={20} className="hover:opacity-100 cursor-help" />
        </div>
      </div>
    </div>
  );
};

export default LoginGate;
