import React from 'react';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { CustomerRegistration, RestaurantRegistration,RestaurantChat, Login, MultiFactor, RestaurantDashboard, RestaurantPage, AddMenu, RestaurantOrders, CustomerDashboard, RestaurantList, ChatHome } from './Component'

const Routes = () => {
    return (
        <BrowserRouter>
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
            <Route path="/customerRegistration" component={CustomerRegistration}></Route>
            <Route path="/restaurantRegistration" component={RestaurantRegistration}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/multiFactor" component={MultiFactor}></Route>
            <Route path="/restaurantHome" component={RestaurantDashboard}></Route>
            <Route path="/customerHome" component={CustomerDashboard}></Route>
            <Route path="/chatHome" component={ChatHome}></Route>
            <Route path="/restaurantList" component={RestaurantList}></Route>
            <Route path="/restaurantPage" component={RestaurantPage}></Route>
            <Route path="/addMenu" component={AddMenu}></Route>
            <Route path="/restaurantOrders" component={RestaurantOrders}></Route>
            <Route path="/restaurantChat" component={RestaurantChat}></Route>
        </BrowserRouter>
    )
}
export default Routes;