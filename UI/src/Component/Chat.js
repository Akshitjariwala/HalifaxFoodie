import React , {useState} from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

const ChatHome = () => {
    const history = useHistory();
    const location = useLocation();

    const initialState = () => {
        setUserAnswerError("")
        userAnswer.answer = ""
    }

    const[userAnswer,setUserAnswer] = useState("")
    const[sequrity_question,setSequrity_question] = useState("")
    const[userAnswerError, setUserAnswerError] = useState("");
    const[userResponse,setUserResponse] = useState("");

    const inputEventLogin = (event) => {
        const value = event.target.value;
        console.log(value)
        setUserAnswer(value)
    }

    function validate(userAnswer){
        let isValid = true;
        if(userAnswer == ""){
            setUserAnswerError("Please Provide Answer")
            isValid = false;
        }
        return isValid;
    }

    const handleMFA = (event) => {
        event.preventDefault()
        setUserResponse(location.answer)
        console.log(location.answer)
        if(validate(userAnswer)) {
            if(userResponse == userAnswer){
                if(location.role == "user"){
                    history.push("/UserHome");
                } else {
                    history.push("/RestaurantHome");
                }
                
            } else {
                window.alert("Answer Does Not Match. Please Provide Correct Answer")
            }
        }
    }

    const styles = {
        color: "white"
    };

    const dropDownStyle = {width:"945px"};

    return (
        <html>
        <head>
        <title>User Home</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-auth.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-database.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-storage.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-firestore.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-functions.js"></script>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.950.0.min.js"></script>
        </head>
        <body>
        <div class="homenav">
            <Link to='/Chat'>Chat</Link>
            <Link to='/RestaurantList'>Restaurant</Link>
        </div>
        
        <div style={{"margin-left":"250px"}}>
            <h2>Chat List</h2>
        </div>
        </body>
    </html>
);
}

export default ChatHome;