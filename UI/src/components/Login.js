import React, { useState } from 'react';
import { loginUser } from '../service';

const Login = (props) => {

    const { handleTabChange } = props;
    const [loginDetails, setLoginDetails] = useState({});

    const validation = () => {
        if ((loginDetails?.email && loginDetails.email !== "" && /\S+@\S+\.\S+/.test(loginDetails.email)) && (loginDetails?.password && loginDetails.password !== "")) {
            return true;
        }
        return false;
    };

    const handleChange = (event) => {
        let temp = { ...loginDetails };
        temp[event.target.name] = event.target.value;
        setLoginDetails(temp);

    }

    const handleLogin = async () => {
        let isValid = validation();
        if (!isValid)
            alert('Form is not valid, Please enter valid details to save')
        else {
            let login = await loginUser(loginDetails);
            if (login.status === 200) {
                localStorage.setItem('sessionEmail', login.data.email);
                handleTabChange('dashboard');
            }
        }
    }

    return (
        <div className="register">
            <div>
                <label style={{ marginRight: '15%', minWidth: '500px' }}>Email</label>
                <input type="email" id="email" name="email" onChange={handleChange} required></input>
            </div>
            <div>
                <label style={{ marginRight: '10.5%', minWidth: '500px' }}>Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} required></input>
            </div>
            <button className="main" type="submit" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
