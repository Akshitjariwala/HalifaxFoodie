import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { CustomerRegistration, RestaurantRegistration, Login, MultiFactor, RestaurantDashboard, MenuList, AddMenu, Orders, CustomerDashboard, RestaurantList, ChatHome, Cart, Payment } from './Component'
import { logoutUser } from './service';

const Routes = () => {
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
        <BrowserRouter>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid" style={{ float: 'right' }}>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/customerRegistration'>Register as User</Link></li>
                            <li><Link to='/restaurantRegistration'>Register as Restaurant</Link></li>
                        </ul>
                        {/* {isLogged && <ul className="nav navbar-nav">
                            <li><Link to='/login' onClick={logOutEvent}>Logout</Link></li>
                        </ul>} */}
                    </div>
                </div>
            </nav>
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
            {/* <Route path="/restaurantOrders" component={RestaurantOrders}></Route> */}
            {/* <Route path="/restaurantChat" component={RestaurantChat}></Route> */}
            <Route path="/orders" component={Orders}></Route>
            <Route path="/cart" component={Cart}></Route>
            <Route path="/payment" component={Payment}></Route>
        </BrowserRouter>
    )
}
export default Routes;