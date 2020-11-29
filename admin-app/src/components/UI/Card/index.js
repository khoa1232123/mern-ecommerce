import React from 'react';
import './style.css';

/**
 * @author
 * @function Card
 **/

const Card = ({ headerLeft, headerRight, children, className, ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {(headerLeft || headerRight) && (
        <div className="cardHeader">
          {headerLeft && <div>{headerLeft}</div>}
          {headerRight && headerRight}
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
