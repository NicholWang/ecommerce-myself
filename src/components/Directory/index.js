import React from 'react';
import './style.scss';
import shopMen from '../../assets/shopMens.jpg';
import shopWomen from '../../assets/shopWomens.jpg';

const Directory = props => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{
          backgroundImage: `url(${shopWomen})`
        }}>
          <a>ShopWomen</a>
        </div>
        <div className="item" style={{
          backgroundImage: `url(${shopMen})`
        }}>
          <a>ShopMen</a>
        </div>
      </div>
    </div>
  )
}

export default Directory;