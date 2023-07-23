import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SignUp = () => {

  const [user, setUser] = useState({});

  const handleChange = (e) => {
    e.preventDefault();

    setUser(Object.assign({}, user, {[e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('/api/v1/sign_in', { user })
    .then( resp => {
      debugger
    })
    .catch(resp => console.log(resp))
  }

  return (
    <div className="wrapper">
      <div className="wrapper">
        <form onSubmit={handleSubmit} >
          <h2> Cadastro </h2>

          <div className="field">
            <input type="text" name="name" placeholder="Nome" onChange={handleChange}/>
          </div>

          <div className="field">
            <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
          </div>

          <div className="field">
            <input type="text" name="password" placeholder="Senha" onChange={handleChange}/>
          </div>

          <div className="field">
            <input type="text" name="password_confirmation" placeholder="Confirme sua Senha" onChange={handleChange}/>
          </div>

          <button type="submit"> Cadastrar </button>
          <p> 
            Já tem uma conta? <Link to="/"> Login </Link>
          </p>
        </form>

      </div>
    </div>
  )
}

export default SignUp

