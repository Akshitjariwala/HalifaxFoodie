import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { pushChatMessageRestaurant, fetchChatMessageRestaurant,fetchChatMessage } from '../service';

const RestaurantChat = () => {
    const history = useHistory();
    const location = useLocation();

    const [RestaurantChat, setRestaurantChat] = useState({
        message:""
    })

    const [RestaurantChatList, setRestaurantChatList] = useState("")
    const [RestaurantChatError, setRestaurantChatError] = useState("")

    useEffect( async () => {
        //let reply = await fetchChatMessage();
        const interval = setInterval( async () =>{ 
            setRestaurantChatList(location.userMessagesList);
            let reply = await fetchChatMessage();
            console.log(reply.data.messages)
            setRestaurantChatList(reply.data.messages);
        }, 1000);
    },[])

    const inputEventChat = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setRestaurantChat({ ...RestaurantChat, message: value })
    }

    function validate(RestaurantChat) {
        let isValid = true;
        if (RestaurantChat == "") {
            setRestaurantChatError("Please Type Chat Message")
            isValid = false;
        }
        return isValid;
    }

    const sendChat = async (event) => {
        event.preventDefault()
        console.log("Chat Sent : "+RestaurantChat.message);
        if (validate(RestaurantChat)) {
            let res = await pushChatMessageRestaurant(RestaurantChat);
            console.log(res.status);
            if(res.status == 200){
                // redirect to user chat page.
                let reply = await fetchChatMessageRestaurant();
                console.log(reply.status)
                if(reply.status == 200){
                    console.log(reply.data.messages);
                    //setRestaurantChatList(reply.data.messages);
                    //history.push({ pathname: '/chatHome', restaurentMessagesList : reply.data.messages })
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
    <div class="row" style={{"height":400,"overflow-y":"scroll","margin-top":80,"margin-left":220,"border-style":"groove"}}>
    <div class="homenav"></div>
    <div class="col-sm-9">
          <div id="section1" >
          {
                RestaurantChatList && RestaurantChatList.map(chat =>
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
                            value={RestaurantChat.message} 
                            />
                            </span>
    <span><button type="submit" class="btn btn-default" onClick={sendChat}>Send</button></span>
</div>
);
}

export default RestaurantChat;