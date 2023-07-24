import React, { useState }  from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
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

const NewWriter = () => {

  const [writer, setWriter] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();

    setWriter(Object.assign({}, writer, {[e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('/api/v1/writers', { writer })
    .then( resp => {
      navigate('/writers')
    })
    .catch( resp => console.log(resp))
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} >
        <h2> Cadastrar novo autor: </h2>
        
        <Field>
          <input type="text" name="name" placeholder="Nome do Autor" onChange={handleChange}/>
        </Field>

        <Field>
          <input type="text" name="document" placeholder="Registro do Autor" onChange={handleChange}/>
        </Field>

        <Button>
          <button type="submit"> Salvar </button>
        </Button>
      </form>
    </Wrapper>
  )
}

export default NewWriter
