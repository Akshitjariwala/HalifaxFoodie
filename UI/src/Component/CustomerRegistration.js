import React, { useState, Link } from 'react'
import { registerUser } from '../service';
import firebase from 'firebase';
import { useHistory } from "react-router-dom";



const RegistrationForm = () => {
    const history = useHistory();
    const initialState = () => {
        setUserNameError("")
        setPasswordError("")
        setConfirmPasswordError("")
        setEmailError("")
        setcontactNumberError("")
        setanswerError("")
        userRegistration.userName = ""
        userRegistration.userEmail = ""
        userRegistration.userPassword = ""
        userRegistration.confirmPassword = ""
        userRegistration.contactNumber = ""
        userRegistration.answer = ""
    }

    const [userNameError, setUserNameError] = useState("");
    const [PasswordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [contactNumberError, setcontactNumberError] = useState("");
    const [securityQuestionError, setsecurityQuestionError] = useState("");
    const [answerError, setanswerError] = useState("");

    const [userRegistration, setuserRegistration] = useState({
        userRole: "user",
        uid: "",
        userName: "",
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
        contactNumber: "",
        securityQuestion: "",
        answer: "",
    });

    const inputEventUserRegistration = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setuserRegistration({ ...userRegistration, [name]: value })
    }

    function validate(userRegistration) {

        let isValid = true;

        if (!userRegistration.userEmail.match('[A-Za-z0-9_]+@[A-Za-z0-9]+.[a-z]+')) {
            setEmailError("Invalid Email Address.")
            isValid = false;
        }

        if (userRegistration.userEmail === "") {
            setEmailError("Please Enter Email Address")
            isValid = false;
        }

        if (userRegistration.userName === "") {
            setUserNameError("Please Enter User Name");
            isValid = false;
        }

        if (userRegistration.userPassword.length < 8 && userRegistration.userPassword !== "") {
            isValid = false;
            window.alert("Password should be atleast 8 characters long.");
        }

        if (userRegistration.confirmPassword.length < 8 && userRegistration.confirmPassword !== "") {
            isValid = false;
            window.alert("Password should be atleast 8 characters long.");
        }

        if (userRegistration.userPassword === "") {
            setPasswordError("Please Enter Password")
            isValid = false;
        }

        if (userRegistration.confirmPassword === "") {
            setConfirmPasswordError("Please Enter Confirm Password")
            isValid = false;
        }

        if (userRegistration.contactNumber.length > 10) {
            isValid = false;
            window.alert("Invalid Contact Number. Contact number length cannnot be greater than 10.")
        }

        if ((userRegistration.userPassword !== "" && userRegistration.userConfirmPassword !== "") && (userRegistration.userPassword !== userRegistration.confirmPassword)) {
            window.alert("Password and Confirm Password does not match.")
        }

        if (userRegistration.answer === "") {
            setanswerError("Please Enter Answer")
            isValid = false;
        }

        if (userRegistration.contactNumber === "") {
            setcontactNumberError("Please Enter Contact Number")
            isValid = false;
        }

        return isValid;
    }

    const HandleRegister = async (event) => {
        event.preventDefault()
        if (validate(userRegistration)) {
            let res = await registerUser(userRegistration)
            console.log(res.status);
            if (res.status === 200) {
                window.alert("User Successfully Registerred.")
                history.push("/login");
            } else {
                window.alert("User Registration Failed.")
            }
            //initialState()
        }
    }

    const dropDownStyle = { width: "945px" };
    return (
        <div class="container tabBody">
            <form class="form-horizontal" onSubmit={HandleRegister}>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="userName">Name:</label>
                    <div class="col-sm-10">
                        <input type="type"
                            className="form-control"
                            id="userName"
                            placeholder="Enter name"
                            name="userName"
                            onChange={inputEventUserRegistration}
                            value={userRegistration.userName} />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{userNameError}</div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="userEmail">Email:</label>
                    <div className="col-sm-10">
                        <input type="email"
                            className="form-control"
                            id="userEmail"
                            placeholder="Enter email"
                            name="userEmail"
                            onChange={inputEventUserRegistration}
                            value={userRegistration.userEmail} />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{emailError}</div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="userPassword">Password:</label>
                    <div className="col-sm-10">
                        <input type="password"
                            className="form-control"
                            id="userPassword"
                            placeholder="Enter password"
                            name="userPassword"
                            onChange={inputEventUserRegistration}
                            value={userRegistration.userPassword}
                        />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{PasswordError}</div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-2" for="confirmPassword">Confirm Password:</label>
                    <div className="col-sm-10">
                        <input type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Enter password again"
                            name="confirmPassword"
                            onChange={inputEventUserRegistration}
                            value={userRegistration.confirmPassword}
                        />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{confirmPasswordError}</div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-2" for="contactNumber">Conatct Number:</label>
                    <div className="col-sm-10">
                        <input type="tel"
                            className="form-control"
                            id="contactNumber"
                            placeholder="Enter contact number"
                            name="contactNumber"
                            onChange={inputEventUserRegistration}
                            value={userRegistration.contactNumber}
                        />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{contactNumberError}</div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="securityQuestion">Security Question :</label>
                    <div className="col-sm-10">
                        <select className="form-control" id="securityQuestion" name="securityQuestion" value={userRegistration.securityQuestion} style={dropDownStyle} onChange={inputEventUserRegistration}>
                            <option value='1'>What is your Monther's maiden name ?</option>
                            <option value='2'>The country you always dreamed of vacationing in ?</option>
                            <option value='3'>What is your favourite colour ?</option>
                            <option value='4'>What is your parent's wedding anniversary ?</option>
                            <option value='5'>What was the name of your elimentary school ?</option>
                            <option value='6'>What is the name of your favourite cousin ?</option>
                            <option value='7'>Who is your childhood hero ?</option>
                        </select>
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{securityQuestionError}</div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="answer">Answer:</label>
                    <div className="col-sm-10">
                        <input type="type"
                            className="form-control"
                            id="answer"
                            placeholder="Enter Answer"
                            name="answer"
                            onChange={inputEventUserRegistration}
                            value={userRegistration.answer}
                        />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{answerError}</div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;