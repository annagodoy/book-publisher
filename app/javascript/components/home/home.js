import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
// import styled from 'styled-components';

const Home = () => {
  return (
    <div className="container">
      <div className="container-header">
        <h2> Home Page </h2>
      </div>

      <div className="container-body">
        <div className="item">
          <Link to={'/writers'}> Autores </Link>
        </div>

        <div className="item">
          <Link to={'/books'}> Livros </Link>
        </div>

        <div className="item">
          <Link to={'/imports'}> Import </Link>
        </div>
      </div>      
    </div>
  )
}

export default Home