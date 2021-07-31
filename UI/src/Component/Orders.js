import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {Card, Accordion, Button, Table} from 'react-bootstrap';
import {getOrders, updateOrder} from '../service';
import RestaurantNavBar from './RestaurantNavBar';
import CustomerNavBar from './CustomerNavBar';


const Orders = () => {
    const history = useHistory();

    const [orders, setOrders] = useState(null);
    const [displayKey, setDisplayKey] = useState();

    const status = [{prev: "PLACED", update: "ACCEPTED", buttonText: "ACCEPT"}, {
        prev: "ACCEPTED",
        update: "DISPATCHED",
        buttonText: "DISPATCH"
    }, {prev: "DISPATCHED", update: "COMPLETE", buttonText: "DELIVERED"}];

    var sesionRole = localStorage.getItem('sessionRole');

    useEffect(async () => {
        var sessionEmail = localStorage.getItem('sessionEmail');
        var sessionRole = localStorage.getItem('sessionRole');

        let creds = {key: sessionRole === 'user' ? 'customerEmail' : 'restaurantEmail', email: sessionEmail};
        let response = await getOrders(creds);
        let tempOrders = Array.isArray(response?.data) ? response?.data : [response?.data];
        tempOrders = tempOrders?.map((ord) => {
            let tempSts;
            if (ord?.orderStatus === 'COMPLETE') {
                tempSts = {update: 'COMPLETE', buttonText: 'COMPLETE'};
            } else {
                tempSts = status.filter(s => s.prev === ord?.orderStatus)[0];
            }
            console.log(tempSts, ord);
            ord = {
                ...ord,
                orderedItems: JSON.parse(ord?.orderedItems)?.['orderedItems'],
                update: tempSts?.update,
                buttonText: tempSts?.buttonText
            };
            return ord;
        })
        setOrders(tempOrders);
    }, []);

    const handleOrderStatus = async (id, sts) => {
        let respone = await updateOrder({orderId: id, update: sts});
        console.log('update', respone);
        if (respone.status === 200) {
            window.location.reload();
        }
    }

    const handleVisualisation = () => {
        history.push({pathname: '/visualisation', orders});
    }

    return (
        <div>
            {sesionRole === 'restaurant' && <RestaurantNavBar/>}
            {sesionRole === 'user' && <CustomerNavBar/>}
            <div style={{"margin-left": "250px", marginTop: '6%'}}>
                <h2>Orders</h2>
                {orders?.length > 0 && <Accordion style={{marginTop: '4%'}} defaultActiveKey={displayKey}>
                    {orders.map((ord, index) => {
                        console.log('ord', ord);
                        return (
                            <Card style={{padding: '10px'}} key={index}>
                                <Card.Header
                                    style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>Order #{ord?.orderId}</div>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={ord?.orderId}
                                                      onClick={() => setDisplayKey(ord?.orderId)}>
                                        View Details
                                    </Accordion.Toggle>
                                    {sesionRole !== 'user' ? <Button disabled={ord?.buttonText === 'COMPLETE'}
                                                                     onClick={() => handleOrderStatus(ord?.orderId, ord?.update)}>{ord.buttonText}</Button>
                                        : <label>{ord.orderStatus}</label>}
                                </Card.Header>
                                <Accordion.Collapse eventKey={ord?.orderId}>
                                    <Card.Body style={{marginTop: "12px"}}>
                                        <Table striped bordered hover>
                                            <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {ord?.["orderedItems"]?.map((d, index) => {
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
                                        <div style={{textAlign: 'right', fontWeight: 'bold'}}>
                                            <span style={{marginLeft: '3px'}}>Total</span>
                                            <span style={{marginLeft: '3px'}}>{ord?.totalCost}</span>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        );
                    })}
                </Accordion>
                }
                {orders?.length > 0 &&
                <Button style={{marginTop: '12px'}} onClick={handleVisualisation}>Visualisation</Button>}
            </div>
        </div>
    );
}

export default Orders;