import React, { Component, useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { pushChatMessage, fetchChatMessage,fetchChatMessageRestaurant } from '../service';

const ChatHome = () => {
    const history = useHistory();
    const location = useLocation();

    useEffect(async () => {
        //let reply = await fetchChatMessageRestaurant();
        //setUserChatList(reply.data.messages);
        //setUserChatList(location.restaurentMessagesList);
        //console.log(reply.data.messages)
        const interval = setInterval( async () =>{ 
            let reply = await fetchChatMessageRestaurant();
            setUserChatList(reply.data.messages);
            setUserChatList(location.restaurentMessagesList);
            console.log(reply.data.messages)
        }, 1000);
    },[])

    const [userChat, setuserChat] = useState({
        message:""
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
        console.log("Chat Sent : "+userChat.message);
        if (validate(userChat)) {
            let res = await pushChatMessage(userChat);
            console.log(res.status);
            if(res.status == 200){
                // redirect to restaurant chat page.
                let reply = await fetchChatMessage();
                if(reply.status == 200){
                    console.log(reply.data.messages);
                    //setUserChatList(reply.data.messages);
                    //history.push({ pathname: '/restaurantChat', userMessagesList : reply.data.messages })
                }
            }
        } else {
            console.log("Chat message Empty.");
        }
    }

    const styles = {
        color: "white"
    };
    
    return (
        <div class="container">
            <h5>User Chat</h5>
        <div class="row" style={{"height":400,"overflow-y":"scroll","margin-top":80,"margin-left":220,"border-style":"groove"}}>
        <div class="homenav"></div>
        <div class="col-sm-9" style={{"margin-left":""}}>
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
      <span class="col-sm-10" style={{"margin-left":"220px","width":850}}>
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
    );
}

export default ChatHome;