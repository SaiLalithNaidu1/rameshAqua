import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNavigation.css'; // Assuming you will create a CSS file for styling

const BottomNavigation = () => {
    return (
        <div className="bottom-navigation">
            <Link to="/home" className="nav-item">Home</Link>
            <Link to="/profile" className="nav-item">Profile</Link>
            <Link to="/settings" className="nav-item">Settings</Link>
        </div>
    );
};

export default BottomNavigation;