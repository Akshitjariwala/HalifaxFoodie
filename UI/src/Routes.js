import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { BrowserRouter,Redirect, Switch, Link, Route } from 'react-router-dom';
import { CustomerRegistration, RestaurantChat, Visualisation, RestaurantRegistration, Login, MultiFactor, RestaurantDashboard, MenuList, AddMenu, Orders, CustomerDashboard, RestaurantList, ChatHome, Cart, Payment, WordCloud } from './Component'

var sessionEmail = localStorage.getItem('sessionEmail') || null;

const Routes = () => {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                {!sessionEmail && <div className="container-fluid" style={{ float: 'right' }}>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/customerRegistration'>Register as User</Link></li>
                            <li><Link to='/restaurantRegistration'>Register as Restaurant</Link></li>
                        </ul>
                    </div>
                </div>}
            </nav>
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>
            <Route path="/customerRegistration" component={CustomerRegistration}></Route>
            <Route path="/restaurantRegistration" component={RestaurantRegistration}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/multiFactor" component={MultiFactor}></Route>
            <Route path="/restaurantHome" component={RestaurantDashboard}></Route>
            <Route path="/customerHome" component={CustomerDashboard}></Route>
            <Route path="/chatHome" component={ChatHome}></Route>
            <Route path="/restaurantList" component={RestaurantList}></Route>
            <Route path="/menuList" component={MenuList}></Route>
            <Route path="/addMenu" component={AddMenu}></Route>
            <Route path="/wordCloud" component={WordCloud}></Route>
            <Route path="/restaurantChat" component={RestaurantChat}></Route>
            <Route path="/orders" component={Orders}></Route>
            <Route path="/cart" component={Cart}></Route>
            <Route path="/payment" component={Payment}></Route>
            <Route path="/visualisation" component={Visualisation}></Route>
        </BrowserRouter>
    )
}
export default Routes;