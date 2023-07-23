import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Login = (props) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();

    setUser(Object.assign({}, user, {[e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('/api/v1/sessions', { user })
    .then( resp => {
      if (resp.data.logged_in){
        setUser(resp.data.user)
        props.handleSuccessfulAuth(resp.data)
      }
    })
    .catch(resp => console.log(resp))
  }

  return (
    <div className="wrapper">
      <div className="wrapper">
        <form onSubmit={handleSubmit} >
          <h2> Entrar </h2>

          <div className="field">
            <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
          </div>

          <div className="field">
            <input type="text" name="password" placeholder="Senha" onChange={handleChange}/>
          </div>

          <button type="submit"> Entrar </button>
          <p> 
            Ainda não tem uma conta? <Link to="/signup"> Cadastrar </Link>
          </p>
        </form>

      </div>
    </div>
  )
}

export default Login

