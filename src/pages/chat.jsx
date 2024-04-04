import React, { useEffect, useState } from "react";
import "./chat.css";
import submitIcon from "../assets/submit.svg";
import Question from "./question";
const Chat = () => {
    const [prompt, setPrompt] = useState("");
    const promptChangeHandler = e => {
        setPrompt(e.target.value);
    };

    return (
        <div className="chat-container">
            <div className="question-box">
                <Question></Question>
            </div>
            {/* <div className="prompt-box">
                <input
                    type="text"
                    value={prompt}
                    onChange={promptChangeHandler}
                    className="prompt-input"
                />
                <img src={submitIcon} alt="Image" className="submit-img" />
            </div> */}
        </div>
    );
};

export default Chat;
