import Navbar from "./components/navbar";
import "./main.css";
import { GlobalContext } from "./Contexts/GlobalContext";
import React, { useState } from "react";
const Layout = ({ children }) => {
    const [selectedCheckbox, setSelectedCheckbox] = useState(["", "", ""]);
    const [songs, setSongs] = useState([]);
    const [isValid, setIsValid] = useState(false);
    return (
        <GlobalContext.Provider
            value={{
                selectedCheckbox,
                setSelectedCheckbox,
                songs,
                setSongs,
                isValid,
                setIsValid
            }}
        >
            <main className="h-screen w-screen bg-[url('./src/assets/bg-image.png')] text-white overflow-hidden">
                <header className="sticky top-0 z-10 ">
                    <Navbar />
                </header>
                {children}
            </main>
        </GlobalContext.Provider>
    );
};

export default Layout;
