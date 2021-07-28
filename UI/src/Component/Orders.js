import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { Card, Accordion, Button, Table } from 'react-bootstrap';
import { getOrders, updateOrder } from '../service';
import RestaurantNavBar from './RestaurantNavBar';
import CustomerNavBar from './CustomerNavBar';


const Orders = () => {
    const history = useHistory();
    const location = useLocation();

    const [orders, setOrders] = useState(null);
    const [displayKey, setDisplayKey] = useState();

    const status = [{ prev: "PLACED", update: "ACCEPTED", buttonText: "ACCEPT" }, { prev: "ACCEPTED", update: "DISPATCHED", buttonText: "DISPATCH" }, { prev: "DISPATCHED", update: "COMPLETE", buttonText: "DELIVERED" }];

    useEffect(async () => {
        let creds = { key: 'customerEmail', email: 'test@gmail.com' };
        let response = await getOrders(creds);
        let tempOrders = response.data;
        tempOrders = tempOrders.map((o) => {
            let tempSts;
            if (o.orderStatus === 'COMPLETE') {
                tempSts = { update: 'COMPLETE', buttonText: 'COMPLETE' };
            }
            else {
                tempSts = status.filter(s => s.prev === o.orderStatus)[0];
            }
            console.log(tempSts);
            o = { ...o, orderedItems: JSON.parse(o.orderedItems), update: tempSts.update, buttonText: tempSts.buttonText };
            return o;
        })
        setOrders(tempOrders);
    }, []);

    const handleOrderStatus = async (id, sts) => {
        let respone = await updateOrder({ orderId: id, update: sts });
        console.log('update', respone);
    }

    return (
        <div>
            <RestaurantNavBar />
            {/* <CustomerNavBar/> */}
            <div style={{ "margin-left": "250px", marginTop: '6%' }}>
                <h2>Orders</h2>
                {orders?.length > 0 && <Accordion style={{ marginTop: '4%' }} defaultActiveKey={displayKey} >
                    {orders.map((ord, index) => {
                        console.log('ord', ord);
                        return (
                            <Card style={{ padding: '10px' }} key={index}>
                                <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>Order #{ord.orderId}</div>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={ord.orderId} onClick={() => setDisplayKey(ord.orderId)}>
                                        View Details
                                    </Accordion.Toggle>
                                    <Button disabled={ord.buttonText === 'COMPLETE'} onClick={() => handleOrderStatus(ord.orderId, ord.update)}>{ord.buttonText}</Button>
                                    {/* <label>{ord.orderStatus}</label> */}
                                </Card.Header>
                                <Accordion.Collapse eventKey={ord.orderId}>
                                    <Card.Body style={{ marginTop: "12px" }}>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ord["orderedItems"].map((d, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{d.itemName}</td>
                                                            <td>{d.count}</td>
                                                            <td>{d.amount}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                        <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                            <span style={{ marginLeft: '3px' }}>Total</span>
                                            <span style={{ marginLeft: '3px' }}>{ord.totalCost}</span>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        );
                    })}
                </Accordion>
                }
            </div>
        </div>
    );
}

export default Orders;