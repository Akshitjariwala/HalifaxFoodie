import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { getMenuList } from '../service';
import { logoutUser } from '../service';

const RestaurantPage = () => {
    const history = useHistory();
    const location = useLocation();

    const [menuList, setMenuList] = useState("")
    const [restaurenEmail, setRestaurantEmail] = useState("")

    useEffect(() => {
        setRestaurantEmail(location.email);
        console.log(location.data);
        var temp = fetchMenu("ownerkfc@gmail.com");
    })

    //var Menu List;
    async function fetchMenu(restaurantName) {
        let menlist = await getMenuList(restaurantName);
        var list = menlist.data.menuList;
        setMenuList(list);
    }

    const handleRestaurentClick = (event, data) => {
        alert(data);
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

    const handleMFA = (event) => {
        event.preventDefault()
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
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/customerRegistration'>Register as User</Link></li>
                            <li><Link to='/restaurantRegistration'>Register as Restaurant</Link></li>
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
        </div>
        </div>
    );
}

export default RestaurantPage;