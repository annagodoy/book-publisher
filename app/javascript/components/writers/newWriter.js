import React, { useState }  from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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
    <div className="wrapper">
      <form onSubmit={handleSubmit} >
        <div> Cadastrar novo autor: </div>
        
        <div className="field">
          <input type="text" name="name" placeholder="Nome do Autor" onChange={handleChange}/>
        </div>

        <div className="field">
          <input type="text" name="document" placeholder="Registro do Autor" onChange={handleChange}/>
        </div>

        <button type="submit"> Cadastrar Autor </button>
      </form>
    </div>
  )
}

export default NewWriter
