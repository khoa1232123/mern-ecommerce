import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

/**
 * @author Rizwan Khan
 * @function
 **/

const Modal = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: 'relative' }}>
          <div className="modalClose" onClick={props.onClose}>
            X
          </div>
          <div className="modalContainer">{props.children}</div>
        </div>
      </div>
    </>
  );
};

const MaterialInput = (props) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="materialInput">
      <label
        className={`label ${focus ? 'focus' : ''}`}
        style={{
          top: 0,
          lineHeight: 'none',
        }}
      >
        {props.label}
      </label>
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          className="input"
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={(e) => {
            setFocus(true);
          }}
          onBlur={(e) => {
            if (e.target.value === '') {
              setFocus(false);
            }
          }}
        />
        {props.rightElement ? props.rightElement : null}
      </div>
    </div>
  );
};

const MaterialButton = ({ title, styleBtn, onClick, style, ...props }) => {
  return (
    <div style={{ width: '100%', ...style }} {...props}>
      <button className="materialButton" style={styleBtn} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

const DropdownMenu = ({ menu, firstMenu, menus, ...props }) => {
  return (
    <div className="headerDropdownContainer">
      {menu}
      <div className="dropdown">
        <div className="upArrow"></div>
        {firstMenu}
        <ul className="headerDropdownMenu">
          {menus &&
            menus.map((item, index) => (
              <li key={index}>
                {item.onClick ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      item.onClick && item.onClick();
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link to={item.href}>{item.label}</Link>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const Anchor = ({ name, ...props }) => {
  return (
    <button {...props} name="anchorButton btn btn-warning">
      {name}
    </button>
  );
};

const Breed = ({ breed, breedIcon, ...props }) => {
  return (
    <div className="breed">
      <ul>
        {breed &&
          breed.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.name}</a>
              {breedIcon}
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Modal, MaterialInput, MaterialButton, DropdownMenu, Anchor, Breed };
