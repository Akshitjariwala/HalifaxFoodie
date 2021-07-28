import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { logoutUser } from '../service';

const RestaurantNavBar = (props) => {
    const location = useLocation();
    const history = useHistory();

    const logOutEvent = async (event) => {
        let response = await logoutUser()
        console.log(response.status);
        if (response.status == 200) {
            history.push("/login");
        } else {
            window.alert("Sign Out Failed!!")
        }
    }

    return (
        <div className="homenav">
            <Link to='/restaurantHome'>Home</Link>
            <Link to={{ pathname: '/addMenu' }}>Add Menu</Link>
            <Link to='/restaurantChat'>Chat</Link>
            <Link to='/orders'>Orders</Link>
            <Link to='/wordCloud'>Word Cloud</Link>
            <Link onClick={logOutEvent}>Logout</Link>
        </div>
    );
}

export default RestaurantNavBar;