import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { getMenuList } from '../service';

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

    const handleMFA = (event) => {
        event.preventDefault()
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
    );
}

export default RestaurantPage;