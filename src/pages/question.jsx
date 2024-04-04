import React, { useEffect, useContext } from "react";
import "./question.css";
import aiIcon from "../assets/ai.png";
import axios from "axios";
import { GlobalContext } from "../Contexts/GlobalContext";
import { Link } from "react-router-dom";
function Question() {
    const {
        selectedCheckbox,
        setSelectedCheckbox,
        setSongs,
        isValid,
        setIsValid
    } = useContext(GlobalContext);
    const questions = [
        {
            question: "Mood",
            options: ["Happy", "Sad"]
        },
        {
            question: "Energy",
            options: ["High", "Medium", "Low"]
        },
        {
            question: "Beats",
            options: ["Fast", "Mid-tempo", "Slow"]
        }
    ];
    useEffect(() => {
        setSelectedCheckbox(["", "", ""]);
    }, []);
    const optionChangeHandler = e => {
        setSelectedCheckbox(prevState => {
            const prev = [...prevState];
            prev[e.target.name] = e.target.value;
            return prev;
        });
    };
    useEffect(() => {
        for (let i = 0; i < 3; i++) {
            if (selectedCheckbox[i] == "") {
                setIsValid(false);
                break;
            } else {
                setIsValid(true);
            }
        }
        console.log(selectedCheckbox);
    }, [selectedCheckbox]);
    const submitHandler = () => {
        // if(JSON.stringify(selectedCheckbox) != );

        if (isValid) {
            axios
                .post(
                    "https://ai-karaoke.onrender.com/prediction/",
                    { data: selectedCheckbox },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then(res => {
                    console.log(res.data.prediction);
                    setSongs(res.data.prediction);
                })
                .catch(err => console.log(err));
        }
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(
                    "https://ai-karaoke.onrender.com/training",
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    return (
        <>
            {questions.map((q, i) => {
                return (
                    <div className="container" key={i}>
                        <div className="ai-icon">
                            <img src={aiIcon} alt="Ai logo" />
                        </div>
                        <div className="question-container">
                            <h2 className="question">{q.question}</h2>
                            {q.options.map((option, j) => {
                                return (
                                    <div className="option">
                                        <input
                                            type="radio"
                                            value={option}
                                            onChange={optionChangeHandler}
                                            name={i}
                                            key={j}
                                        />
                                        <label htmlFor="">{option}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
            <div className="flex justify-center">
                <Link
                    to="/karaoke"
                    className={`${isValid ? "" : "pointer-events-none"} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit`}
                    onClick={submitHandler}
                >
                    Proceed
                </Link>
            </div>
        </>
    );
}

export default Question;
