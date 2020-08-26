import React from 'react';
import './default.scss';
import Header from './components/Header'
import HomePage from './page/HomePage';
import Footer from './components/Footer'


function App() {
  return (
    <div className="App">
      <Header/>
      <div className="main">
        <HomePage/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
