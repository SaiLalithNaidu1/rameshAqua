import React from 'react';
import './Button.css'; // Assuming you have a CSS file for button styles

const Button = ({ onClick, children, styleType = 'default' }) => {
    return (
        <button className={`button ${styleType}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;