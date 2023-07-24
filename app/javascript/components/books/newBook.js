import React, { useState, useEffect }  from 'react';
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

const BookSelect = styled.div`
  select {
    width: 49%;
    height: 40px;
    border-radius: 7px;
    border: 2px solid #000000;
    text-align: center;
    font-size: 14px;
    padding: 10px 20px;
    margin-bottom: 10px;
    color: #6d6d6d;
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

const NewBook = () => {

  const [book, setBook] = useState({});
  const [categories, setCategories] = useState([])
  const [writers, setWriters] = useState([])
  const [loaded, setLoaded] = useState(false)
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/v1/book_categories.json')
    .then( resp => {
      setCategories(resp.data.data)
      setLoaded(true)
    })
    .catch( resp => console.log(resp) )
  }, [])

  useEffect(() => {
    axios.get('/api/v1/writers.json')
    .then( resp => {
      setWriters(resp.data.data)
      setLoaded(true)
    })
    .catch( resp => console.log(resp) )
  }, [])

  const handleChange = (e) => {
    e.preventDefault();

    setBook(Object.assign({}, book, {[e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const writer_id = book.writer_id
    axios.post('/api/v1/books', { book,  writer_id })
    .then( resp => {
      navigate('/books')
    })
    .catch( resp => console.log(resp))
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} >
        <h2> Cadastrar novo livro: </h2>
        
        <Field>
          <input type="text" name="title" placeholder="Nome do Livro" onChange={handleChange}/>
        </Field>

        <Field>
          <input type="text" name="isbn" placeholder="ISBN" onChange={handleChange}/>
        </Field>

        <Field>
          <input type="text" name="publish_date" placeholder="Data de Publicação" onChange={handleChange}/>
        </Field>

        <BookSelect>
          <select 
            onChange={handleChange} 
            name="book_category_id">
            { categories.map((options, i) => <option key={options.id} value={options.id}> {options.attributes.name} </option>) }
          </select>
        </BookSelect>

        <BookSelect>
          <select 
            onChange={handleChange} 
            name="writer_id">
            { writers.map((options, i) => <option key={options.id} value={options.id}> {options.attributes.name} </option>) }
          </select>
        </BookSelect>

        <Button>
          <button type="submit"> Salvar </button>
        </Button>
      </form>
    </Wrapper>
  )
}

export default NewBook
