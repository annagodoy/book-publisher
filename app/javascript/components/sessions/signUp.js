import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


const Wrapper = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 2rm;
  }
`
const Field = styled.div `
  padding: 10px 20px;

  input {
    width: 50%;
    height: 40px;
    border-radius: 7px;
    border: 2px solid #000000;
    text-align: center;
    font-size: 14px;
  }
`

const Button = styled.div`
  button { 
    font-size: 18px;
    width: 25%;
    height: 45px;
    border-radius: 12px;
    margin-top: 15px;
    color: #efefef;
    background: #000000;
    border: 1px solid #000000;
  }
`

const Paragraph = styled.div`
  p {
    font-size: 15px;
  }

  a {
    text-decoration: none;
    color: #000000;
    font-weight: 500;
    text-transform: uppercase;
  }
`

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
    <Wrapper>
      <form onSubmit={handleSubmit} >
        <h2> Cadastro </h2>

        <Field>
          <input type="text" name="name" placeholder="Nome" onChange={handleChange}/>
        </Field>

        <Field>
          <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
        </Field>

        <Field>
          <input type="text" name="password" placeholder="Senha" onChange={handleChange}/>
        </Field>

        <Field>
          <input type="text" name="password_confirmation" placeholder="Confirme sua Senha" onChange={handleChange}/>
        </Field>

        <Button>
          <button type="submit"> Cadastrar </button>
        </Button>
        <Paragraph>
          <p> 
            Já tem uma conta? <Link to="/"> Login </Link>
          </p>
        </Paragraph>
      </form>
    </Wrapper>
  )
}

export default SignUp

