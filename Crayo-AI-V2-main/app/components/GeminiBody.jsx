"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Compass,
  Lightbulb,
  Youtube,
  Code,
  SendHorizontal,
} from "lucide-react";
import { Context } from "../context/ContextProvider";
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Avatar from "./Avatar";
import Loading from "./loading";


const GeminiBody = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, userloading] = useAuthState(auth);
  const {
    theme,
    submit,
    recentPrompts,
    displayResult,
    loading,
    result,
    input,
    setInput,
  } = useContext(Context);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (isLoading || loading) {
    return <Loading/>;
  }
  return (
    <div className="flex-1 min-h-[100vh] pb-[15vh] relative">
      <div className="flex items-center justify-evenly p-5 text-xl text-gray-400">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://i.ibb.co/xHLX9DL/image-removebg-preview.png" className="h-10 rounded-lg" alt="Crayo Ai Logo" />
          <span className="self-center font-bold text-2xl whitespace-nowrap bg-gradient-to-r from-white to-white text-transparent bg-clip-text">Crayo Ai</span>
        </a>
        <p >Crayo: Your personal Ai bot.</p>
        <Avatar />
      </div>
      <div className="max-w-[900px] m-auto">
        {!displayResult ? (
          <>
            <div className="my-12 text-5xl font-medium p-5">
              <p>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Hello, {user?.displayName}
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="grid grid-cols-4 gap-5 p-5">
              <div className={`h-48 ${theme === 'dark' ? 'bg-[#232323] text-slate-300' : 'bg-slate-100 text-slate-800'} p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer`}>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <Compass
                  size={35}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"
                />
              </div>
              <div className={`h-48 ${theme === 'dark' ? 'bg-[#232323] text-slate-300' : 'bg-slate-100 text-slate-800'} p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer`}>
                <p>What’s the reaction to and impact of autonomous vehicles</p>
                <Lightbulb
                  size={35}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"
                />
              </div>
              <div className={`h-48 ${theme === 'dark' ? 'bg-[#232323] text-slate-300' : 'bg-slate-100 text-slate-800'} text-slate-300 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer`}>
                <p>Come up with a recipe for an upcoming event</p>
                <Youtube
                  size={35}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"
                />
              </div>
              <div className={`h-48 ${theme === 'dark' ? 'bg-[#232323] text-slate-300' : 'bg-slate-100 text-slate-800'} text-slate-300 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer`}>
                <p>Evaluate and rank common camera categories</p>
                <Code
                  size={35}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="my-10 flex items-center gap-5">
              <Avatar />
              <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>{recentPrompts}</p>
            </div>
            <div className="flex items-start gap-5">
              <img src="https://i.ibb.co/xHLX9DL/image-removebg-preview.png" alt="Crayo" style={{ width: '30px', height: '30px' }} />
              <p
                className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'} text-md font-normal loading-6`}
                dangerouslySetInnerHTML={{ __html: result }}
              ></p>
            </div>
          </div>
        )}
        <div className="absolute bottom-0 w-full max-w-[900px] px-5 m-auto">
          <form action={submit}>
            <div className="flex items-center justify-between gap-5 bg-bgSecondaryColor py-2.5 px-5 rounded-full">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className={`flex-1 ${theme === 'dark' ? 'bg-[#232323] text-slate-100' : 'bg-slate-100 text-gray-700'} p-4 rounded-lg border-none outline-none text-md`}
                placeholder="Enter a prompt here"
              />
              <div className="flex cursor-pointer">
                <SendHorizontal type="submit" size={20} />
              </div>
            </div>
          </form>
          <p className="text-gray-400 text-sm text-center p-3">
            We use Gemini model by Google which may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeminiBody;
