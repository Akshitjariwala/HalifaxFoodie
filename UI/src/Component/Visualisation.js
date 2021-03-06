import React, { useEffect, useState } from 'react';
import RestaurantNavBar from './RestaurantNavBar';
import CustomerNavBar from './CustomerNavBar';
import { useLocation } from "react-router-dom";
import LineChart from 'react-linechart';

const Visualisation = (props) => {
    const [data, setData] = useState(null);
    const location = useLocation();

    var sessionEmail = localStorage.getItem('sessionEmail');
    var sessionRole = localStorage.getItem('sessionRole');

    useEffect(() => {
        let orders = Array.isArray(location.orders) ? location.orders : [location.orders];
        console.log(orders);
        orders = orders.map((o) => {
            let obj = { x: null, y: null };
            obj.x = o.orderId;
            obj.y = o.rating || 0;
            return obj;
        })
        const tempData = [
            {
                color: "steelblue",
                points: orders
            }
        ];
        setData(tempData);

    }, [])
    return (
        <div className="tabBody" style={{ marginRight: '20px', marginLeft: '250px'}}>
        {sessionRole === 'user' && <CustomerNavBar />}
        {sessionRole === 'restaurant' && <RestaurantNavBar />}

            {data && <LineChart
                xLabel="ORDER ID"
                yLabel="RATING"
                width={600}
                height={400}
                data={data}
            />}
        </div>

    );
};
export default Visualisation;