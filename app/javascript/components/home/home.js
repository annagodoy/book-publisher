import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 2em;
  }
`

const Item = styled.div`
  border: 1px solid #000000;
  height: 35px;
  border-radius: 5px;
  width: 15%;
  margin-left: auto;
  margin-right: auto;
  background: #000000;
  padding: 20px 10px 10px 10px;
  margin-bottom: 15px;

  a {
    text-decoration: none;
    color: #efefef;
    font-size: 22px;
    font-weight: 500;
  }
`

const Home = () => {
  return (
    <Wrapper>
      <h2> Home Page </h2>

      <div className="container-body">
        <Item>
          <Link to={'/writers'}> Autores </Link>
        </Item>

        <Item>
          <Link to={'/books'}> Livros </Link>
        </Item>

        <Item>
          <Link to={'/imports'}> Importação </Link>
        </Item>
      </div>      
    </Wrapper>
  )
}

export default Home