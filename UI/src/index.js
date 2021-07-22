import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RegistrationForm from './Component/RegistrationForm'
import RestaurantRegistration from './Component/RestaurantRegistration'
import Login from './Component/Login'
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import MultiFactor from './Component/MultiFactor'
import RestaurantHome from './Component/RestaurantHome'
import UserHome from './Component/UserHome'
import ChatHome from './Component/Chat'
import RestaurantList from './Component/RestaurantList'
import RestaurantPage from './Component/RestaurantPage'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <html>
        <head>
        <title>User Registration Page</title>
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
        <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav">
                      <li><Link to='/Login'>Login</Link></li>
                      <li><Link to='/RegistrationForm'>Register as User</Link></li>
                      <li><Link to='/RestaurantRegistration'>Register as Restaurant</Link></li>
                    </ul>
            </div>
        </div>
    </nav>
    <br></br><br></br><br></br><br></br>
      <Route path="/RegistrationForm" component={RegistrationForm}></Route>
      <Route path="/RestaurantRegistration" component={RestaurantRegistration}></Route>
      <Route path="/Login" component={Login}></Route>
      <Route path="/MultiFactor" component={MultiFactor}></Route>
      <Route path="/RestaurantHome" component={RestaurantHome}></Route> 
      <Route path="/UserHome" component={UserHome}></Route>
      <Route path="/ChatHome" component={ChatHome}></Route> 
      <Route path="/RestaurantList" component={RestaurantList}></Route>
      <Route path="/RestaurantPage" component={RestaurantPage}></Route>
    </body>
    </html>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
