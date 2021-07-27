import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { logoutUser } from '../service';


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

    const logOutEvent = async (event) => {
        let response = await logoutUser()
        console.log(response.status);
        if(response.status == 200){
            history.push("/login");
        } else {
            window.alert("Sign Out Failed!!")
        }
    }

    const styles = {
        color: "white"
    };

    const dropDownStyle = { width: "945px" };

    return (
        <div>
        <nav class="navbar navbar-inverse navbar-fixed-top">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                        <li style={{"position":" absolute","right":50}}><button  class="btn default cus" onClick={logOutEvent} style={{}}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </nav>
        <div class="tabBody">
            <div class="homenav">
                <Link to='/chatHome'>Chat</Link>
                <Link to='/restaurantList'>Restaurant</Link>
            </div>

            <div style={{ "margin-left": "250px" }}>
                <h2>User Home</h2>
            </div>
        </div>
        </div>
    );
}

export default UserHome;