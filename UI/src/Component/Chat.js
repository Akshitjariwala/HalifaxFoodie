import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';

const ChatHome = () => {
    const history = useHistory();
    const location = useLocation();

    const initialState = () => {
        setUserAnswerError("")
        userAnswer.answer = ""
    }

    const [userAnswer, setUserAnswer] = useState("")
    const [sequrity_question, setSequrity_question] = useState("")
    const [userAnswerError, setUserAnswerError] = useState("");
    const [userResponse, setUserResponse] = useState("");

    const inputEventLogin = (event) => {
        const value = event.target.value;
        console.log(value)
        setUserAnswer(value)
    }

    useEffect(async () => {
        const interval = setInterval( async () =>{
            let reply = await fetchChatMessageRestaurant();
            var msg = reply.data.messages;
            setUserChatList((userChatList) => [...userChatList,msg]);
        }, 10000);
    },[])

    function validate(userAnswer) {
        let isValid = true;
        if (userAnswer == "") {
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
            if (userResponse == userAnswer) {
                if (location.role == "user") {
                    history.push("/customerHome");
                } else {
                    history.push("/restaurantHome");
                }

            } else {
                window.alert("Answer Does Not Match. Please Provide Correct Answer")
            }
        }
    }

    const styles = {
        color: "white"
    };

    const dropDownStyle = { width: "945px" };

    return (
        <div class="tabBody">
            <div class="homenav">
                <Link to='/chatHome'>Chat</Link>
                <Link to='/restaurantList'>Restaurant</Link>
            </div>

            <div style={{ "margin-left": "250px" }}>
                <h2>Chat List</h2>
            </div>
        </div >

    );
}

export default ChatHome;