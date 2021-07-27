import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { logoutUser } from '../service';

const RestaurantOrders = () => {
    const history = useHistory();
    const location = useLocation();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let tempOrders = [{ orderId: 1, orderItems: [], orderStatus: "PLACED", customer: "" }, { orderId: 1, orderItems: [], orderStatus: "PLACED", customer: "test@gmail.com" }]
        setOrders(tempOrders);
    }, []);

    const logOutEvent = async (event) => {
        let response = await logoutUser()
        console.log(response.status);
        if(response.status == 200){
            history.push("/login");
        } else {
            window.alert("Sign Out Failed!!")
        }
    }

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
        <div>
            <div class="homenav">
                <Link to='/chatHome'>Chat</Link>
                <Link to='/restaurantList'>Restaurant</Link>
            </div>

            <div style={{ "margin-left": "250px" }}>
                <h2>Restaurant Orders</h2>
                <h2>{orders.length}</h2>
            </div>
        </div>
        </div>
    );
}

export default RestaurantOrders;