import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LexChat from './LexChat';
import CustomerNavBar from './CustomerNavBar';

const UserHome = () => {
    const history = useHistory();
    const location = useLocation();

    const initialState = () => {
        setUserAnswerError("")
        userAnswer.answer = ""
    }

    const [userAnswer, setUserAnswer] = useState("")
    const [userAnswerError, setUserAnswerError] = useState("");
    const [userResponse, setUserResponse] = useState("");

    const inputEventLogin = (event) => {
        const value = event.target.value;
        console.log(value)
        setUserAnswer(value)
    }

    function validate(userAnswer) {
        let isValid = true;
        if (userAnswer === "") {
            setUserAnswerError("Please Provide Answer")
            isValid = false;
        }
        return isValid;
    }

    const handleMFA = (event) => {
        event.preventDefault()
        setUserResponse(location.answer)
        console.log(location.answer)
        if (validate(userAnswer)) {
            if (userResponse === userAnswer) {
                if (location.role === "user") {
                    history.push("/customerHome");
                } else {
                    history.push("/restaurantHome");
                }

            } else {
                window.alert("Answer Does Not Match. Please Provide Correct Answer")
            }
        }
    }

    return (
        <div>
            <CustomerNavBar />
            <div style={{ "margin-left": "250px" }}>
                <h2>User Home</h2>
            </div>
            <LexChat />
        </div>
    );
}

export default UserHome;