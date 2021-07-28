import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { getMenuList } from '../service';
import { Badge, Button } from 'react-bootstrap';

const MenuList = () => {
    const history = useHistory();
    const location = useLocation();

    const [menuList, setMenuList] = useState("")
    const [restaurenEmail, setRestaurantEmail] = useState("")

    useEffect(() => {
        fetchMenu(localStorage.getItem('sessionRestaurant'));
    }, [])

    //var Menu List;
    async function fetchMenu(restaurantName) {
        let menlist = await getMenuList(restaurantName);
        var list = menlist.data.menuList;
        console.log(list);
        setMenuList(list);
   }

    const handleRestaurentClick = (event, data) => {
        alert(data);
    }

    const handleIncCount = (index) => {
        let tempMenu = [...menuList];
        tempMenu = tempMenu.map((m, i) => {
            if (i === index) {
                console.log(m?.count);
                m.count = m?.count ? (m.count + 1) : 1
            }
            return m;
        })
        console.log(tempMenu);
        setMenuList(tempMenu);
    }

    const handleDecCount = (index) => {
        let tempMenu = [...menuList];
        tempMenu = tempMenu.map((m, i) => {
            if (i === index && m?.count > 0) {
                m.count = (m.count - 1)
            }

            return m;
        })
        console.log(tempMenu);
        setMenuList(tempMenu);
    }

    const handlePlaceOrder = () => {
        let totalCost = 0;
        let tempOrders = [...menuList];
        tempOrders = tempOrders.filter((m) => m.count && m.count > 0);
        console.log('filter', tempOrders);
        tempOrders = tempOrders.map((m, i) => {
            m.amount = m.itemPrice * m.count;
            totalCost = totalCost + m.amount;
            return m;
        })
        let orderDetails = { orderedItems: tempOrders, totalCost: totalCost, orderStatus: "PLACED", customerEmail: "test@gmail.com", restaurenEmail: "test@gmail.com" };
        history.push({ pathname: '/cart', orderDetails });
    }

    return (
        <div className="tabBody">
            <div className="homenav">
                <Link to='/chatHome'>Chat</Link>
                <Link to='/restaurantList'>Restaurant</Link>
            </div>

            <div style={{ "margin-left": "250px", width: '50%' }}>
                <h2>{location.restaurantName}</h2>
                {menuList && menuList.map((item, index) =>
                    <div style={{
                        boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20%)',
                        transition: '0.3s',
                        borderRadius: '5px', padding: '7px', marginBottom: '7px'
                    }}>
                        <div>
                            <br></br>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p><Link>{item.itemName}</Link></p>
                                    <p>Rs. {item.itemPrice}</p>
                                </div>
                                <div>
                                    <Button onClick={() => { handleDecCount(index) }}> - </Button>
                                    <Button>{item?.count || 0}</Button>
                                    <Button onClick={() => { handleIncCount(index) }}> + </Button>

                                </div>
                            </div>
                            <p>{item.itemDescription}</p>
                        </div>
                        <br></br>
                    </div>
                )}
                {menuList.length > 0 && <Button style={{ marginTop: '12px' }} onClick={handlePlaceOrder}> Place Orders </Button>}
            </div>
        </div>
    );
}

export default MenuList;