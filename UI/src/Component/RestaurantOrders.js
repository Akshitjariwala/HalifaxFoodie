import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';

const RestaurantOrders = () => {
    const history = useHistory();
    const location = useLocation();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let tempOrders = [{ orderId: 1, orderItems: [], orderStatus: "PLACED", customer: "" }, { orderId: 1, orderItems: [], orderStatus: "PLACED", customer: "test@gmail.com" }]
        setOrders(tempOrders);
    }, []);

    return (
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
    );
}

export default RestaurantOrders;