import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Logo from "../../assets/logo.png";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../firebase/util";
const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Simple Tut" />
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li key={uuidv4()} onClick={() => auth.signOut()}>
                <span>LogOut</span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li key={uuidv4()}>
                <Link to="/register">Register</Link>
              </li>
              <li key={uuidv4()}>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
