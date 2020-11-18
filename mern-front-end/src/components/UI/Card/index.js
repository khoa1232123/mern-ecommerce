import React from 'react';
import './style.scss';

const Card = ({ children, headerLeft, headerRight, className, ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {headerLeft && (
        <div className="cardHeader">
          <div>{headerLeft}</div>
          {headerRight}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
