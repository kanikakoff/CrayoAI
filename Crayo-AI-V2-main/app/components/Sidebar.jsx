"use client";
import React, { useContext, useState } from "react";
import {
  Menu,
  Plus,
  CircleHelp,
  Activity,
  Settings,
  MessageSquare,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Context } from "../context/ContextProvider";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { theme, setDisplayResult, setInput, prevPrompts, setRecentPrompts, submit } = useContext(Context);

  const loadPrompt = (prompt) => {
    setRecentPrompts(prompt);
    submit(prompt);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`min-h-[100vh] ${isOpen ? 'w-72' : 'w-0'} relative inline-flex flex-col justify-between py-6 px-4 ${theme === 'dark' ? 'bg-[#232323]' : 'bg-slate-100'}`}>
      <div>
        <Menu
          size={40}
          onClick={toggleSidebar}
          className={`cursor-pointer absolute ${theme === 'dark' ? 'text-white' : 'text-black'} z-10`}
        />
        {isOpen && (
          <div>
            <div
              className="mt-10 inline-flex py-2.5 items-start gap-2.5 px-4 bg-bgPrimaryColor rounded-full text-md text-gray-400 cursor-pointer"
              onClick={() => {
                setDisplayResult(false);
                setInput("");
              }}
            >
              <Plus size={20} className="cursor-pointer text-softTextColor" />
              <p>New chat</p>
            </div>
            <div className="flex flex-col text-gray-400">
              <p className="mt-8 mb-5r">Recent</p>
              {prevPrompts?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className={`my-2 flex items-center gap-2.5 pr-10 rounded-full text-gray-200 cursor-pointer ${theme === 'dark' ? 'hover:bg-slate-200' : 'hover:bg-slate-400'} p-2 bg-bgPrimaryColor`}
                >
                  <MessageSquare
                    size={20}
                    className="cursor-pointer"
                  />
                  <p>{item?.slice(0, 15)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-5">
          <div className="pr-2.5 cursor-pointer flex gap-2 text-gray-400 items-center">
            <CircleHelp size={20} className="text-softTextColor" />
            <p>Help</p>
          </div>
          <div className="pr-2.5 cursor-pointer flex gap-2 text-gray-400 items-center">
            <Activity size={20} className="text-softTextColor" />
            <p>Activity</p>
          </div>
          <div className="pr-2.5 cursor-pointer flex gap-2 text-gray-400 items-center">
            <Settings size={20} className="text-softTextColor" />
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;