import React from 'react';
import './style.scss'
import Logo from '../../assets/logo.png'
import {v4 as uuidv4} from 'uuid'
const Header = props => {
  return (
    <div className="header">

      <div className="wrap">
        <div className="logo">
          <img src={Logo} alt="Simple Tut"/>
        </div>

        <div className="callToActions">
          <ul>
            <li key={uuidv4()}>Login</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header;