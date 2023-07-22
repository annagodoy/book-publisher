import React, { useState, useEffect, Fragment } from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Book from './book';

const Books = () => {
  const [ books, setBooks] = useState([]);
  const [ query, setQuery] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();

    setQuery(Object.assign({}, query, { [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.get('/api/v1/books_search', { params: query })
    .then(resp => {
      debugger;
    })
    .catch(resp => console.log(resp))
  }

  useEffect(() => {
    axios.get('/api/v1/books.json')
    .then( resp => setBooks(resp.data.data) )
    .catch( resp => console.log(resp) )
  }, [])

  const grid = books.map(item => {
    return (
      <Book 
        key={item.attributes.id}
        attributes={item.attributes}
      />
    )
  })

  return (
    <div className="books">
      <div className="header">
        <h1>Livros</h1>
        <div className="subheader">
          Lista de Livros
        </div>
        <div className="newBook">
          <Link to={`/books/new`}> Novo Livro</Link>
        </div>
        <div className="searchBook">
          <form onSubmit={handleSubmit}> 
            <input type="text" name="query" placeholder="Buscar Livro" onChange={handleChange} />

            <button type="submit">Buscar</button>
          </form>
        </div>
      </div>
      <div className="grid">
        { grid }
      </div>
    </div>
  )
}

export default Books