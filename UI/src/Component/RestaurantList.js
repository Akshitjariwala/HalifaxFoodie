import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { getRestaurantList } from '../service';
import CustomerNavBar from './CustomerNavBar';

const RestaurantList = () => {
    const history = useHistory();
    const location = useLocation();

    const [restaurantsList, setRestaurantsList] = useState("")

    useEffect(() => {
        fetchResto();
        console.log(restaurantsList);
    }, [])

    //var restaurantsList;
    async function fetchResto() {
        let restaurantList = await getRestaurantList();
        var list = restaurantList.data.restaurantList;
        setRestaurantsList(list);
    }

    const handleRestaurentClick = (event, data) => {
        history.push({ pathname: '/menuList', data: data });
    }

    return (
        <div className="tabBody">
            <CustomerNavBar />

            <div style={{ "margin-left": "250px" }}>
                <h2>Restaurant List</h2>
                {restaurantsList && restaurantsList.map(restaurant =>
                    <div className="card">
                        <div className="container">
                            <br></br>
                            <p><Link onClick={((e) => handleRestaurentClick(e, restaurant.restaurantEmail))}>{restaurant.restaurantName}</Link></p>
                            <p>{restaurant.restaurantDescription}</p>
                            <p>{restaurant.restaurantAddress}</p>
                            <p>{restaurant.contactNumber}</p>
                            <p>{restaurant.restaurantEmail}</p>
                        </div>
                        <br></br>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RestaurantList;