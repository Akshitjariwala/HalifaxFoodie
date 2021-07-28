import React, { Component, useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { pushChatMessage, fetchChatMessage, fetchChatMessageRestaurant } from '../service';
import { logoutUser } from '../service';
import RestaurantNavBar from './RestaurantNavBar';
import CustomerNavBar from './CustomerNavBar';


const ChatHome = () => {
    const history = useHistory();
    const location = useLocation();

    useEffect(async () => {
        const interval = setInterval( async () =>{ 
            let reply = await fetchChatMessageRestaurant();
            var mes = reply.data.messages;
            setUserChatList(reply.data.messages);
            console.log(reply.data.messages)
        }, 10000);
    },[])

    const [userChat, setuserChat] = useState({
        message: ""
    })
    const [userChatError, setUserChatError] = useState("")
    const [userChatList, setUserChatList] = useState("")

    const inputEventChat = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setuserChat({ ...userChat, message: value })
    }

    function validate(userChat) {
        let isValid = true;
        if (userChat == "") {
            setUserChatError("Please Type Chat Message")
            isValid = false;
        }
        return isValid;
    }

    const sendChat = async (event) => {
        event.preventDefault()
        console.log("Chat Sent : " + userChat.message);
        if (validate(userChat)) {
            let res = await pushChatMessage(userChat);
            console.log(res.status);
            if (res.status == 200) {
                let reply = await fetchChatMessage();
                if (reply.status == 200) {
                    console.log(reply.data.messages);
                }
            }
        } else {
            console.log("Chat message Empty.");
        }
    }

    const logOutEvent = async (event) => {
        let response = await logoutUser()
        console.log(response.status);
        if (response.status == 200) {
            history.push("/login");
        } else {
            window.alert("Sign Out Failed!!")
        }
    }

    const styles = {
        color: "white"
    };

    return (
        <div>
            <CustomerNavBar />
            <div class="container">
                <h5>User Chat</h5>
                <div class="row" style={{ "height": 400, "overflow-y": "scroll", "margin-left": 220, "border-style": "groove" }}>
                    <div class="col-sm-9" style={{ "margin-left": "" }}>
                        <div id="section1" >
                        {userChatList && userChatList.map(chat =>
                                <div>
                                    <div class="container">
                                        <p>{chat}</p>
                                    </div>
                                    <br></br>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <br></br><br></br>
                <span class="col-sm-10" style={{ "margin-left": "220px", "width": 850 }}>
                    <input type="type"
                        class="form-control"
                        id="restaurantMessage"
                        placeholder="Enter Chat Message"
                        name="restaurantMessage"
                        onChange={inputEventChat}
                        value={userChat.message}
                    />
                </span>
                <span><button type="submit" class="btn btn-default" onClick={sendChat}>Send</button></span>
            </div>
        </div>
    );
}

export default ChatHome;