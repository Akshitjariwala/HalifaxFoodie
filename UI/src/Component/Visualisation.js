import React, { useEffect, useState } from 'react';
import RestaurantNavBar from './RestaurantNavBar';
import { useLocation } from "react-router-dom";
import LineChart from 'react-linechart';

const Visualisation = (props) => {
    const [data, setData] = useState(null);
    const location = useLocation();

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
            <RestaurantNavBar userRole="customer" email="test@gmail.com" />

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