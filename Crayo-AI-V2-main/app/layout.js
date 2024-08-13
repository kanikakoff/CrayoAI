'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { usePathname } from "next/navigation"; // Import the usePathname hook
const inter = Inter({ subsets: ["latin"] });
import ContextProvider from "./context/ContextProvider";

export default function RootLayout({ children }) {
    const pathname = usePathname(); // Get the current pathname

    // Check if the current route is the chat page
    const isChatPage = pathname === "/chat";
    const isLoginPage = pathname === "/login";
    const isSignUpPage = pathname === "/signup";

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Crayo AI</title>
                <link rel="icon" type="image/x-icon" href="https://i.ibb.co/xHLX9DL/image-removebg-preview.png" />
                <meta name="description" content="Get Support On Crayo AI" />
                <meta name="keywords" content="Crayo AI, AI Customer Support" />
                <meta name="author" content="Tech Titans Go!" />
            </head>
            <body style={{ height: "100svh" }} className={inter.className}>
                {!isChatPage && !isLoginPage && !isSignUpPage && <Nav />} {/* Only render Nav if not on chat, login, or signup page */}
                <ContextProvider>{children}</ContextProvider>
            </body>
        </html>
    );
}