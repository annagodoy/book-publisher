import React, { useState, useEffect }  from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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
    <div className="wrapper">
      <form onSubmit={handleSubmit} >
        <div> Cadastrar novo livro: </div>
        
        <div className="field">
          <input type="text" name="title" placeholder="Nome do Livro" onChange={handleChange}/>
        </div>

        <div className="field">
          <input type="text" name="isbn" placeholder="ISBN" onChange={handleChange}/>
        </div>

        <div className="field">
          <input type="text" name="publish_date" placeholder="Data de Publicação" onChange={handleChange}/>
        </div>

        <div className="field">
          <div className="bookCategory">
            <select 
              onChange={handleChange} 
              name="book_category_id">
              { categories.map((options, i) => <option key={options.id} value={options.id}> {options.attributes.name} </option>) }
            </select>
          </div>
        </div>

        <div className="field">
          <div className="bookWriter">
            <select 
              onChange={handleChange} 
              name="writer_id">
              { writers.map((options, i) => <option key={options.id} value={options.id}> {options.attributes.name} </option>) }
            </select>
          </div>
        </div>

        <button type="submit"> Cadastrar Livro </button>
      </form>
    </div>
  )
}

export default NewBook
