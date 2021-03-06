import React, { Component, useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { pushChatMessage, fetchChatMessage, fetchChatMessageRestaurant, pushChatMessageRestaurant } from '../service';
import { logoutUser,deleteSubscription } from '../service';
import RestaurantNavBar from './RestaurantNavBar';
import CustomerNavBar from './CustomerNavBar';


const ChatHome = () => {
    const history = useHistory();
    const location = useLocation();

    const [subscription, setSubscription] = useState({
        subscription: "",
    })

    const [subscriptionUser, setSubscriptionUser] = useState("")

    useEffect(async () => {
        const interval = setInterval( async () =>{ 
            setSubscriptionUser(localStorage.getItem('subscriptionRestaurant'));
            console.log(subscriptionUser);
                let reply = ''
                reply = await fetchChatMessageRestaurant(subscriptionUser);
                console.log(reply)
                if((reply !== "NA")){
                    console.log("Test")
                    if(reply.status == 200){
                        var msg = reply.data.messages;
                        msg = "Restaurant : "+msg;
                        setUserChatList((userChatList) => [...userChatList,msg]);
                    }
                }
        }, 10*1000);
        return () => {
            var status = deleteSub();
        }
    },[])

    async function deleteSub(){
        setSubscription(localStorage.getItem('subscriptionRestaurant'));
            let res = await deleteSubscription(subscription);
            return res.status;
    }

    const [userChat, setuserChat] = useState({
        message: "",
        userEmail:localStorage.getItem('sessionEmail')
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
        let res;
        if (validate(userChat)) {
            var userMsg = "User : "+userChat.message;
            setUserChatList((userChatList) => [...userChatList,userMsg]);
            res = await pushChatMessage(userChat);
            console.log(res.status);
            if (res.status == 200) {
                setuserChat({ ...userChat, message: "" })
                localStorage.setItem('subscriptionRestaurant',res.data.subscription);
                console.log(localStorage.getItem('subscriptionRestaurant'));
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
            <div class="container" style={{"margin-top": "5%"}}>
                <h2 style={{"margin-left":220}}>User Chat</h2>
                <div class="row" style={{ "height": 400, "overflow-y": "scroll", "margin-left": 220, "border-style": "groove" }}>
                    <div class="col-sm-9" style={{ "margin-left": "" }}>
                        <div id="section1" >
                        {userChatList && userChatList.map(chat =>
                                <div>
                                    <p>{chat}</p>
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