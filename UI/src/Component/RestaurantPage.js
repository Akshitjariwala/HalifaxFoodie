import React , {useState} from 'react'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import { getMenuList } from '../service';
 
const RestaurantPage = () => {
    const history = useHistory();
    const location = useLocation();

    const[menuList,setMenuList] = useState("")
    const[restaurenEmail,setRestaurantEmail] = useState("")

    useEffect(() => {
        setRestaurantEmail(location.email);
        console.log(location.data);
        var temp = fetchMenu("ownerkfc@gmail.com");
    })

    //var Menu List;
    async function fetchMenu(restaurantName){
        let menlist = await getMenuList(restaurantName);
        var list = menlist.data.menuList;
        setMenuList(list);
    }

     const handleRestaurentClick = (event,data) => {
        alert(data);
    }

    const handleMFA = (event) => {
        event.preventDefault()
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
            <Link to='/ChatHome'>Chat</Link>
            <Link to='/RestaurantList'>Restaurant</Link>
        </div>
        
        <div style={{"margin-left":"250px"}}>
            <h2>{location.restaurantName}</h2>
                    {menuList && menuList.map(item =>
                        <div class="card">
                        <div class="container">
                            <br></br>
                          <p><Link onClick={((e) => handleRestaurentClick(e, item.restaurantEmail))}>{item.itemName}</Link></p> 
                          <p>{item.itemDescription}</p> 
                          <p>{item.itemPrice}</p> 
                        </div>
                        <br></br>
                      </div>
                    )}
        </div>
        </body>
    </html>
);
}

export default RestaurantPage;