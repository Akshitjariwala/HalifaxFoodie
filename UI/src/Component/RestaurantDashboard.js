import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import RestaurantNavBar from './RestaurantNavBar';

const RestaurantHome = () => {
    const history = useHistory();
    const location = useLocation();

    const initialState = () => {
        setUserAnswerError("")
        userAnswer.answer = ""
    }

    useEffect(() => {
        setrestaurantEmail(location.email)
    })

    const [userAnswer, setUserAnswer] = useState("")
    const [sequrity_question, setSequrity_question] = useState("")
    const [userAnswerError, setUserAnswerError] = useState("");
    const [userResponse, setUserResponse] = useState("");
    const [restaurantEmail, setrestaurantEmail] = useState("");

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

    return (
        <div className="tabBody">
            <RestaurantNavBar/>

            <div style={{ "margin-left": "250px" }}>
                <h2>Restaurant Home</h2>
            </div>
        </div>
    );
}

export default RestaurantHome;