import React, { useEffect, useState } from 'react';
import './style.css';
import flipkartLogo from '../../images/logo/flipkart.png';
import goldenStar from '../../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from '../MaterialUI';
import MenuHeader from './MenuHeader';
import { useDispatch, useSelector } from 'react-redux';
import { login, signout } from '../../redux/actions';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userLogin = () => {
    console.log('abc');
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  console.log(auth);

  const renderLogInMenu = () => {
    if (auth.authenticate) {
      return (
        <DropdownMenu
          menu={
            <span className=" fullName" onClick={() => setLoginModal(true)}>
              {auth.user.firstName} {auth.user.lastName}
            </span>
          }
          menus={[
            { label: 'My Profile', href: '', icon: null },
            { label: 'SuperCoin Zone', href: '', icon: null },
            { label: 'Flipkart Plus Zone', href: '', icon: null },
            { label: 'Orders', href: '', icon: null },
            { label: 'Wishlist', href: '', icon: null },
            { label: 'My chats', href: '', icon: null },
            { label: 'Coupons', href: '', icon: null },
            { label: 'Rewards', href: '', icon: null },
            { label: 'Notifications', href: '', icon: null },
            { label: 'Gift cards', href: '', icon: null },
            {
              label: 'Logout',
              href: '',
              icon: null,
              onClick: () => dispatch(signout()),
            },
          ]}
          firstMenu={
            <div className="firstmenu">
              <span>New Customer?</span>
              <a href="/" style={{ color: '#2874f0' }}>
                Sign Up
              </a>
            </div>
          }
        />
      );
    } else {
      return (
        <DropdownMenu
          menu={
            <span className="loginButton" onClick={() => setLoginModal(true)}>
              Login
            </span>
          }
          menus={[
            { label: 'My Profile', href: '', icon: null },
            { label: 'Flipkart Plus Zone', href: '', icon: null },
            { label: 'Orders', href: '', icon: null },
            { label: 'Wishlist', href: '', icon: null },
            { label: 'Rewards', href: '', icon: null },
            { label: 'Gift Cards', href: '', icon: null },
          ]}
          firstMenu={
            <div className="firstmenu">
              <span>New Customer?</span>
              <a href="/" style={{ color: '#2874f0' }}>
                Sign Up
              </a>
            </div>
          }
        />
      );
    }
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <MaterialInput
                type="text"
                label="Enter Email/Enter Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightElement={<a href="/">Forgot?</a>}
              />
              <hr />
              <MaterialButton
                title="Login"
                styleBtn={{ backgroundColor: '#fb641b', color: '#ffffff' }}
                onClick={userLogin}
              />
              <p style={{ marginTop: '20px' }}>OR</p>
              <MaterialButton
                title="Request OTP"
                styleBtn={{ backgroundColor: '#fff', color: '#2874f0' }}
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* Logo here */}
        <div className="logo">
          <a href="/">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <span style={{ marginTop: '-10px' }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </span>
        </div>
        {/* end Logo here */}
        {/* Search component */}
        <div
          style={{
            padding: '0 10px',
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: '#2874f0',
                }}
              />
            </div>
          </div>
        </div>
        {/* end Search component */}
        {/* header right */}
        <div className="rightMenu">
          {/* login menu */}
          {renderLogInMenu()}
          {/* end login menu */}
          {/* more menu */}
          <DropdownMenu
            menu={
              <span className="more">
                <span>More</span>
                <IoIosArrowDown />
              </span>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null },
            ]}
          />
          {/* end more menu */}
          {/* cart */}
          <div>
            {/* <span className="cart"> */}
            <Link to="/cart" className="cart">
              <IoIosCart />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </Link>
            {/* </span> */}
          </div>
          {/* end cart */}
        </div>
        {/* end header right */}
      </div>
      <MenuHeader />
    </div>
  );
};
export default Header;
