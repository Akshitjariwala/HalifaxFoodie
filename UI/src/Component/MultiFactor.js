import React , {useState} from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MultiFactor = () => {
    const history = useHistory();
    const location = useLocation();

    const initialState = () => {
        setUserAnswerError("")
        userAnswer.answer = ""
    }

    const[userAnswer,setUserAnswer] = useState("")
    const[sequrity_question,setSequrity_question] = useState("")
    const[userAnswerError, setUserAnswerError] = useState("");
    const[userResponse,setUserResponse] = useState("");

    const inputEventLogin = (event) => {
        const value = event.target.value;
        console.log(value)
        setUserAnswer(value)
    }

    function validate(userAnswer){
        let isValid = true;
        if(userAnswer == ""){
            setUserAnswerError("Please Provide Answer")
            isValid = false;
        }
        return isValid;
    }

    const handleMFA = (event) => {
        event.preventDefault()
        setUserResponse(location.answer)
        console.log(location.answer)
        if(validate(userAnswer)) {
            if(userResponse == userAnswer){
                history.push("/Home");
            } else {
                window.alert("Answer Does Not Match. Please Provide Correct Answer")
            }
        }
    }

    const styles = {
        color: "white"
    };

    const dropDownStyle = {width:"945px"};

    return (
            <form class="form-horizontal" onSubmit={handleMFA}>
                <div class="form-group" >
                <h3><label style={{"margin-left":"560px"}} for="securityQuestion">Security Question</label></h3>
                <br></br><br></br><br></br>
                <div class="col-sm-10">
                    <label for="securityQuestion" style={{"margin-left":'550px'}} >{location.securityQuestion}</label>
                </div>
                <div style={{fontSize:12,color:'red',"margin-left":'210px'}}></div>
                <div>{setUserAnswerError}</div>
                </div>
             <div class="form-group">
               <div class="col-sm-10" style={{"margin-left":"430px",width:"500px",fontSize:20}}>
                 <input type="type" 
                    class="form-control" 
                    id="userAnswer" 
                    placeholder="Enter Answer"
                    name="userAnswer"
                    onChange={inputEventLogin}
                    value={userAnswer}
                    />
               </div>
                </div>
                <div style={{fontSize:14,color:'red',"margin-left":'580px'}}>{userAnswerError}</div>
                <br></br>
                   <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="submit" style={{"margin-left":"330px"}} class="btn btn-default">Multifactor Authentication</button>
                        </div>
                   </div>
                <div>
                </div>    
        </form>
);
}

export default MultiFactor;