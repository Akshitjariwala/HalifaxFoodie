import React, { useState } from 'react'
import { registerRestaurant } from '../service';
import { useHistory } from "react-router-dom";


const RestaurantRegistration = () => {
    const history = useHistory();
    const initialState = () => {
        restaurantRegistration.restaurantName = ""
        restaurantRegistration.restaurantDescription = ""
        restaurantRegistration.restaurantEmail = ""
        restaurantRegistration.userEmail = ""
        restaurantRegistration.userPassword = ""
        restaurantRegistration.confirmPassword = ""
        restaurantRegistration.contactNumber = ""
        restaurantRegistration.restaurantAddress = ""
        restaurantRegistration.answer = ""
        setRestaurantNameError("")
        setrestaurantDescriptionError("")
        setRestaurantEmailError("")
        setEmailError("")
        setUserPasswordError("")
        setConfirmPasswordError("")
        setContactNumberError("")
        setRestaurantAddressError("")
        setanswerError("")
    }

    const [restaurantNameError, setRestaurantNameError] = useState("");
    const [restaurantDescriptionError, setrestaurantDescriptionError] = useState("");
    const [restaurantEmailError, setRestaurantEmailError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [PasswordError, setUserPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [contactNumberError, setContactNumberError] = useState("");
    const [restaurantAddressError, setRestaurantAddressError] = useState("");
    const [securityQuestionError, setsecurityQuestionError] = useState("");
    const [answerError, setanswerError] = useState("");

    const [restaurantRegistration, setRestaurantRegistration] = useState({
        userRole: "restaurant",
        uid: "",
        restaurantName: "",
        restaurantDescription: "",
        restaurantEmail: "",
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
        contactNumber: "",
        restaurantAddress: "",
        securityQuestion: "",
        answer: "",
    });

    const inputEventRestaurantRegistration = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setRestaurantRegistration({ ...restaurantRegistration, [name]: value })
    }

    function validate(restaurantRegistration) {

        let isValid = true;

        if (!restaurantRegistration.restaurantEmail.match('[A-Za-z0-9_]+@[A-Za-z0-9]+.[a-z]+')) {
            setRestaurantEmailError("Invalid Email Address.")
            isValid = false;
        }

        if (!restaurantRegistration.userEmail.match('[A-Za-z0-9_]+@[A-Za-z0-9]+.[a-z]+')) {
            setEmailError("Invalid Email Address.")
            isValid = false;
        }

        if (restaurantRegistration.userEmail === "") {
            setEmailError("Please Enter Email Address")
            isValid = false;
        }

        if (restaurantRegistration.restaurantDescription === "") {
            setrestaurantDescriptionError("Please Enter Restaurent Description")
            isValid = false;
        }

        if (restaurantRegistration.restaurantEmail === "") {
            setRestaurantEmailError("Please Enter Restaurant Email Address")
            isValid = false;
        }

        if (restaurantRegistration.restaurantName === "") {
            setRestaurantNameError("Please Enter Restaurant Name");
            isValid = false;
        }

        if (restaurantRegistration.userPassword === "") {
            setUserPasswordError("Please Enter Password")
            isValid = false;
        }

        if (restaurantRegistration.confirmPassword === "") {
            setConfirmPasswordError("Please Enter Confirm Password")
            isValid = false;
        }

        if (restaurantRegistration.contactNumber == "") {
            setContactNumberError("Please Enter Contact number")
            isValid = false;
        }
        if (restaurantRegistration.contactNumber.length > 10) {
            isValid = false;
            window.alert("Invalid Contact Number. Contact number length cannnot be greater than 10.")
        }

        if ((restaurantRegistration.userPassword !== "" && restaurantRegistration.userConfirmPassword !== "") && (restaurantRegistration.userPassword !== restaurantRegistration.confirmPassword)) {
            isValid = false;
            window.alert("Password and Confirm Password does not match.")
        }

        if (restaurantRegistration.confirmPassword.length < 8 && restaurantRegistration.confirmPassword !== "") {
            isValid = false;
            window.alert("Password should be atleast 8 characters long.");
        }

        if (restaurantRegistration.userPassword.length < 8 && restaurantRegistration.userPassword !== "") {
            isValid = false;
            window.alert("Password should be atleast 8 characters long.");
        }

        if (restaurantRegistration.answer === "") {
            isValid = false;
            setanswerError("Please Enter Answer")
        }

        if (restaurantRegistration.restaurantAddress === "") {
            setRestaurantAddressError("Please Enter Restaurant Address")
            isValid = false;
        }

        return isValid;
    }

    const handleRestaurantRegister = async (event) => {
        event.preventDefault()
        if (validate(restaurantRegistration)) {
            console.log(restaurantRegistration)
            let res = await registerRestaurant(restaurantRegistration)
            console.log(res.status);
            if (res.status === 200) {
                window.alert("User Successfully Registerred.")
                history.push("/login");
            } else {
                window.alert("User Registration Failed.")
            }
        }
    }

    const styles = {
        color: "white"
    };

    const dropDownStyle = { width: "945px" };

    return (
        <div className="container tabBody" style={{"margin-top":"5%"}}>
            <form className="form-horizontal" onSubmit={handleRestaurantRegister}>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="restaurantName">Restaurant Name:</label>
                    <div className="col-sm-10">
                        <input type="type"
                            className="form-control"
                            id="restaurantName"
                            placeholder="Enter Restaurant Name"
                            name="restaurantName"
                            onChange={inputEventRestaurantRegistration}
                            value={restaurantRegistration.restaurantName} />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{restaurantNameError}</div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="restaurantDescription">Description:</label>
                    <div className="col-sm-10">
                        <input type="type"
                            className="form-control"
                            id="restaurantDescription"
                            placeholder="Enter Description"
                            name="restaurantDescription"
                            onChange={inputEventRestaurantRegistration}
                            value={restaurantRegistration.restaurantDescription} />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{restaurantDescriptionError}</div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="restaurantEmail">Restaurant Email:</label>
                    <div className="col-sm-10">
                        <input type="email"
                            className="form-control"
                            id="restaurantEmail"
                            placeholder="Enter Restaurant Email"
                            name="restaurantEmail"
                            onChange={inputEventRestaurantRegistration}
                            value={restaurantRegistration.restaurantEmail} />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{restaurantEmailError}</div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="restaurantAddress">Restaurant Address:</label>
                    <div className="col-sm-10">
                        <input type="type"
                            className="form-control"
                            id="restaurantAddress"
                            placeholder="Enter Restaurant Address"
                            name="restaurantAddress"
                            onChange={inputEventRestaurantRegistration}
                            value={restaurantRegistration.restaurantAddress} />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{restaurantAddressError}</div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="userEmail">Login Email:</label>
                    <div className="col-sm-10">
                        <input type="email"
                            className="form-control"
                            id="userEmail"
                            placeholder="Enter email"
                            name="userEmail"
                            onChange={inputEventRestaurantRegistration}
                            value={restaurantRegistration.userEmail} />
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
                            onChange={inputEventRestaurantRegistration}
                            value={restaurantRegistration.userPassword}
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
                            onChange={inputEventRestaurantRegistration}
                            value={restaurantRegistration.confirmPassword}
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
                            placeholder="Enter Contact Number"
                            name="contactNumber"
                            onChange={inputEventRestaurantRegistration}
                            value={restaurantRegistration.contactNumber}
                        />
                    </div>
                    <div style={{ fontSize: 12, color: 'red', "margin-left": '210px' }}>{contactNumberError}</div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="securityQuestion">Security Question :</label>
                    <div className="col-sm-10">
                        <select className="form-control" id="securityQuestion" name="securityQuestion" value={restaurantRegistration.securityQuestion} style={dropDownStyle} onChange={inputEventRestaurantRegistration}>
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
                            onChange={inputEventRestaurantRegistration}
                            value={restaurantRegistration.answer}
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

export default RestaurantRegistration;