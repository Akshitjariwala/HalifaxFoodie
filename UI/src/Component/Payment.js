import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { placeOrder } from '../service';
import { Table, Button } from 'react-bootstrap';

const Payment = () => {
    const history = useHistory();
    const location = useLocation();

    const [payment, setPayment] = useState({
        cardNumber: "",
        cvv: ""
    });

    useEffect(() => {
        console.log(location.orderDetails);
    }, [])

    const handlePayment = async () => {
        let orderDetails = location.orderDetails;
        let response = await placeOrder(orderDetails);
        if(response.status === 200) {
            console.log('reposne', response);
        } else {
            console.log('err', response);
        }
    }

    return (
        <div className="container tabBody">
            <form className="form-horizontal" >
                <div className="form-group">
                    <label className="control-label col-sm-2" for="cardNumber">Card Number :</label>
                    <div className="col-sm-10">
                        <input type="type"
                            className="form-control"
                            id="cardNumber"
                            placeholder="Enter Card Number"
                            name="cardNumber"
                            required={true}
                            value={payment.cardNumber} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="itemDescription">CVV :</label>
                    <div className="col-sm-10">
                        <input type="type"
                            className="form-control"
                            id="cvv"
                            placeholder="Enter your CVV"
                            name="cvv"
                            value={payment.cvv} />
                    </div>
                </div>
                <Button style={{float: 'right'}} onClick={handlePayment}>PAY</Button>
            </form>
        </div>
    );
}

export default Payment;