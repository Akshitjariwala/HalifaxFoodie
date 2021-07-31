import React, { useState } from 'react'
import { loginUser } from '../service';
import { useHistory } from "react-router-dom";
import { getRole } from '../service';
import { BrowserRouter,Redirect, Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const history = useHistory();
    const initialState = () => {
        setUserEmailError("")
        setUserPasswordError("")
        userData.userEmail = ""
        userData.userPassword = ""
    }

    const [userData, setUserData] = useState({
        userEmail: "",
        userPassword: ""
    })

    const [userEmailError, setUserEmailError] = useState("")
    const [userPasswordError, setUserPasswordError] = useState("")
    const [multifactor, setMultiFactor] = useState("");

    const inputEventLogin = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setUserData({ ...userData, [name]: value })
    }


    function validate(userData) {

        let isValid = true;

        if (userData.userEmail === "") {
            setUserEmailError("Please Enter Email ID")
            isValid = false;
        }

        if (userData.userPassword !== "" && userData.userPassword.length < 8) {
            isValid = false;
            window.alert("Password should be atleast 8 characters long.");
        }

        if (userData.userPassword === "") {
            setUserPasswordError("Please Enter Password")
            isValid = false;
        }
        return isValid;
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        if (validate(userData)) {
            let res = await loginUser(userData);
            var response = res.data;
            var userId = response.uid;
            var userEmail = userData.userEmail;
            if (res.status === 200) {
                console.log(res.status)
                let role = await getRole(userData);
                console.log(role)
                if (role.status === 200) {
                    var resRole = role.data;
                    var userRole = resRole.userRole;
                    console.log(resRole)
                    console.log(userId)
                    localStorage.setItem('sessionEmail',userEmail);
                    localStorage.setItem('sessionRole',userRole);
                    var response = await axios.post('https://ti9nlzbjo4.execute-api.us-east-1.amazonaws.com/default/multifactorVerification?userID=' + userId + '&role=' + userRole)
                    var responseFromLambda = response.data;
                    console.log(responseFromLambda)
                    var securityQuestion = responseFromLambda.securityQuestion;
                    var answer = responseFromLambda.answer;
                    history.push({ pathname: '/multiFactor', securityQuestion: securityQuestion, answer: answer, role: userRole, email: userEmail });
                } else {
                    window.alert("Role Fetching Failed.");
                }
            } else {
                window.alert("Authentication Failed.")
            }
        }
    }

    return (
        <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
                {<div className="container-fluid" style={{ float: 'right' }}>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/customerRegistration'>Register as User</Link></li>
                            <li><Link to='/restaurantRegistration'>Register as Restaurant</Link></li>
                        </ul>
                    </div>
                </div>}
            </nav>
        <div className="container tabBody">
            <form className="form-horizontal" onSubmit={handleLogin}>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="userEmail">Email:</label>
                    <div className="col-sm-10">
                        <input type="email"
                            className="form-control"
                            id="userEmail"
                            placeholder="Enter Email"
                            name="userEmail"
                            onChange={inputEventLogin}
                            value={userData.userEmail} />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{userEmailError}</div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="userPassword">Password:</label>
                    <div className="col-sm-10">
                        <input type="password"
                            className="form-control"
                            id="userPassword"
                            placeholder="Enter Password"
                            name="userPassword"
                            onChange={inputEventLogin}
                            value={userData.userPassword}
                        />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{userPasswordError}</div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="" className="btn btn-default" onClick={handleLogin}>Login</button>
                    </div>
                </div>
                <div>
                </div>
            </form>
        </div>
        </div>
    );
}
export default Login;