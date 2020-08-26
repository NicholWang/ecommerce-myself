import React from 'react';
import './style.scss';

const Footer = props => {
  return (
    <div className="footer" >
      <div className="wrap" dangerouslySetInnerHTML={{__html: '&copy; SimpleTut 2020'}}></div>
    </div>
  )
}

export default Footer;