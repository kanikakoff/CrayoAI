'use client';
import Loading from "./components/loading";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./lib/firebase";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Typewriter from 'react-typewriter-effect';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./globals.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('js');
  const [text, setText] = useState('');

  let textIndex = 0;

  const StreamText = () => {
    const getText = (i) => {
      switch (i) {
        case 0:
          return `reliable virtual assistant.`;
        case 1:
          return `questions, instantly answered.`;
        case 2:
          return `support, just a click away.`;
        case 3:
          return `24/7 customer care.`;
        default:
          return '';
      }
    }

    const typeText = () => {
      const currentText = getText(textIndex);
      let newText = '';
      let i = 0;

      const typingSpeed = 90;
      const erasingSpeed = 30;
      const pauseBetweenTexts = 1500;

      const typeInterval = setInterval(() => {
        if (i < currentText.length) {
          newText += currentText[i];
          setText(newText);
          i++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            const eraseInterval = setInterval(() => {
              if (newText.length > 0) {
                newText = newText.slice(0, -1);
                setText(newText);
              } else {
                clearInterval(eraseInterval);
                textIndex = (textIndex + 1) % 4; // Cycle through the 4 texts
                setTimeout(typeText, pauseBetweenTexts);
              }
            }, erasingSpeed);
          }, pauseBetweenTexts);
        }
      }, typingSpeed);
    };

    typeText();
  };

  const languages = ['js', 'react', 'html'];
  let languageIndex = 0;

  const writeCode = () => {
    const getCode = (lang) => {
      switch (lang) {
        case 'js':
          return `function helloWorld() {\n  console.log('Hello, World!');\n}`;
        case 'react':
          return `import React from 'react';\n\nconst HelloWorld = () => {\n  return <div>Hello, World!</div>;\n};`;
        case 'html':
          return `<!DOCTYPE html>\n<html>\n<head>\n  <title>Hello, World!</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>`;
        default:
          return '';
      }
    };

    const typeCode = () => {
      const codeText = getCode(languages[languageIndex]);
      let newCode = '';
      let i = 0;

      const typingSpeed = 70;
      const erasingSpeed = 30;
      const pauseBetweenLanguages = 1500;

      setCode(''); // Clear existing code

      const typeInterval = setInterval(() => {
        if (i < codeText.length) {
          newCode += codeText[i];
          setCode(newCode);
          i++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            const eraseInterval = setInterval(() => {
              if (newCode.length > 0) {
                newCode = newCode.slice(0, -1);
                setCode(newCode);
              } else {
                clearInterval(eraseInterval);
                languageIndex = (languageIndex + 1) % languages.length;
                setTimeout(typeCode, pauseBetweenLanguages);
              }
            }, erasingSpeed);
          }, 1000);
        }
      }, typingSpeed);
    };

    typeCode();
  };

  useEffect(() => {
    writeCode();
    StreamText();
  }, []);

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
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col bg-[#001a31] min-h-screen">
        <div style={{
          backgroundImage: 'url("https://i.ibb.co/d0dhd0K/Pngtree-abstract-technology-blue-and-pink-1254744.jpg")',
          backgroundBlendMode: 'multiply',
          backgroundColor: '#bebebe'
        }} className="bg-cover h-screen w-full flex justify-center items-center flex-col">
          <span className="text-4xl font-extrabold mt-10 mb-10 text-white">
            <span className="text-6xl h-16 bg-gradient-to-r from-blue-400 via-blue-300 to-purple-500 inline-block text-transparent bg-clip-text">
              Crayo AI
            </span>
            <span className="text-6xl"> Support – Here to Help!</span>
          </span>
          <div>
            <Typewriter
              options={{
                strings: [
                  'Any Information',
                  'Technical Support',
                  'FAQs',
                  'Live Agent Handoff',
                  'Guided Tutorials'
                ],
                autoStart: true,
                loop: true,
                delay: 100,
              }}
              className="text-2xl font-semibold text-center mb-4"
            />
          </div>
          <div className="mt-5 text-center">
            <p>
              Welcome to Crayo AI customer support! Our intelligent chatbot is here to assist you with
              <br />
              any questions or concerns you may have. Designed to provide quick and accurate responses,
              <br />
              available 24/7.
            </p>
          </div>
          <div className="mt-10">
            {user ? (
              <button
                onClick={() => router.push('/chat')}
                className="px-10 py-2 rounded-xl bg-gradient-to-r from-purple-500 font-semibold to-blue-500 hover:from-blue-500 hover:to-purple-500 hover:scale-105 shadow-xl transition duration-300 ease-in-out"
              >
                Start Chat
              </button>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="px-10 py-2 rounded-xl bg-gradient-to-r from-purple-500 font-semibold to-blue-500 hover:from-blue-500 hover:to-purple-500 hover:scale-105 shadow-xl transition duration-300 ease-in-out"
              >
                Get Started For Free
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-center items-center w-full h-fit gap-6 px-8">
          <div className="w-1/3 text-white self-start text-start h-20">
            <span className="text-6xl font-semibold">Your</span>
            <p className="font-semibold text-2xl">{text}</p>
          </div>
          <div className="flex relative justify-center items-center">
            <img src="/macScreen.png" className="w-[640px] z-40 h-auto" />
            <div className="!bg-slate-100 dark:!bg-slate-800 top-0 p-4 w-[520px] h-[345px] z-0 absolute">
              <SyntaxHighlighter className="!bg-slate-100 dark:!bg-slate-800 !pt-0 !text-sm" language={language} style={solarizedlight}>
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Crayo AI. All rights reserved.
          </p>
          <div className="mt-2">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}
