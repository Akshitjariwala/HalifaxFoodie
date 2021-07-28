import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { getMenuList } from '../service';
import { Table, Button } from 'react-bootstrap';

const Cart = () => {
    const history = useHistory();
    const location = useLocation();

    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        console.log(location.orderDetails);
        let tempDetails = location.orderDetails;
        tempDetails = tempDetails?.orderedItems?.length > 0 ? tempDetails : null;
        setOrderDetails(tempDetails);
    }, [])

    const handleNext = () => {
        history.push({ pathname: '/payment', orderDetails });
    }

    return (
        <div className="tabBody">
            <div className="homenav">
                <Link to='/chatHome'>Chat</Link>
                <Link to='/restaurantList'>Restaurant</Link>
            </div>
            {!orderDetails  && <div style={{ textAlign: 'center' }}> No orders </div>}
            {orderDetails && (
                <div style={{ "margin-left": "250px" }}>
                    <div >
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Items</th>
                                    <th>Quantity</th>
                                    <th>Rate</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails && orderDetails?.["orderedItems"]?.map((m, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{m.itemName}</td>
                                            <td>{m.count}</td>
                                            <td>{m.itemPrice}</td>
                                            <td>{m.amount}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <div style={{ width: '60%', float: 'right' }}>
                            <h4>Total: {orderDetails?.totalCost}</h4>
                        </div>
                    </div>
                    <Button onClick={handleNext}> Make Payment</Button>
                </div>)}
        </div>
    );
}

export default Cart;