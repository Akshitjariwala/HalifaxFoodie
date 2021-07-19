import React, { useState } from 'react';
import { registerUser } from '../service';

const Register = (props) => {

    const { handleTabChange } = props;
    const [details, setDetails] = useState({ course: 'CSCI5308' });

    const validation = () => {
        if ((details?.name && details.name !== "") && (details?.email && details.email !== "" && /\S+@\S+\.\S+/.test(details.email)) && (details?.password && details.password !== "") && (details?.course && details.course !== "")) {
            return true;
        }
        return false;
    };

    const handleChange = (event) => {
        let temp = { ...details };
        temp[event.target.name] = event.target.value;
        setDetails(temp);
    };

    const handleRegistration = async () => {
        let isValid = validation();
        if (!isValid)
            alert('Form is not valid, Please enter valid details to save')
        else {
           let hasRegistered =  await registerUser(details);
            if(hasRegistered.status !== 200)
            {
                alert(hasRegistered.data.message);
            } else {
                handleTabChange('login');
            }
        }
            
    }

    return (
        <div className="register">
            <div>
                <label className="col-xs-4" style={{ marginRight: '14%', minWidth: '500px' }}>Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} required></input>
            </div>
            <div>
                <label style={{ marginRight: '15%', minWidth: '500px' }}>Email</label>
                <input type="email" id="email" name="email" onChange={handleChange} required></input>
            </div>
            <div>
                <label style={{ marginRight: '10.5%', minWidth: '500px' }}>Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} required></input>
            </div>
            <div>
                <label style={{ marginRight: '8%', minWidth: '500px' }}>Select Topic</label>
                <select name="course" id="course" onChange={handleChange} required>
                    <option value="CSCI5308">CSCI5308</option>
                    <option value="CSCI5408">CSCI5408</option>
                    <option value="CSCI5410">CSCI5410</option>
                </select>
            </div>
            <button className="main" type="submit" onClick={handleRegistration}>Register</button>
        </div>
    );
};

export default Register;
