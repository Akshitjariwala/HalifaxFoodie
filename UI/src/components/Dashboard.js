import React, { useState, useEffect } from 'react';
import { logoutUser, getAllOnlineUers } from '../service';

const Dashboard = (props) => {

    const { handleTabChange } = props;
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = localStorage.getItem('sessionEmail');

    const getUsers = async () => {
        if (currentUser) {
            let list = await getAllOnlineUers();
            if (list.length > 1) {
                let thisUser = (list.find(l => l.email === currentUser));
                list = list.filter(l => l.email !== currentUser);
                list.unshift(thisUser);
            }
            setUsers(list || []);
        }
        setIsLoading(false);
    }

    const handleLogout = async () => {
        let status = await logoutUser({ currentUser });
        if (status) {
            localStorage.removeItem('sessionEmail');
            handleTabChange('login');
        }
    }

    useEffect(() => {
        getUsers();
    }, [])


    return (
        <div className="register">
            {users.length === 0 && !isLoading && 'Please login to view details'}
            <ul>
                {users.length > 0 && users.map((p, index) => {
                    if (p.email === currentUser)
                        return <li key={index}>
                            {p.name} <button onClick={handleLogout}>Logout</button></li>
                    else return <li key={index}>{p.name}</li>
                })}
            </ul>
        </div>
    );
};

export default Dashboard;
