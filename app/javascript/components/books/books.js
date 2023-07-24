import React, { useState, useEffect, Fragment } from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Book from './book';
import styled from 'styled-components';


const Wrapper = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const Header = styled.div`
  padding: 100px 100px 10px 100px

  h1 {
    font-size: 42px
  }
`

const Subheader = styled.div`
  font-weight: 300;
  font-size: 26px;
  padding: 10px 10px 30px 10px
`

const NewBook = styled.div`

  a {
    color: #ffffff;
    background: #000000;
    border-radius: 4px;
    padding: 10px 50px;
    width: 100%;
    text-decoration: none
  }
  
`

const SearchBook = styled.div`
  margin-top: 50px;
  width: 75%;
  margin-left: auto;
  margin-right: auto;

  input {
    width: 55%;
    height: 38px;
    border-radius: 7px;
    text-indent: 10px;
    border: 1px solid #6e6d6d;
  }

  button {
    font-size: 15px;
    width: 9%;
    height: 31px;
    border-radius: 4px;
    margin-top: 15px;
    margin-left: 15px;
    color: #efefef;
    background: #000000;
    border: 1px solid #000000;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px 20px 45px 20px;
`


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
      setBooks(resp.data.data) 
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
    <Wrapper>
      <Header>
        <h1>Livros</h1>
        <Subheader>
          Lista de Livros
        </Subheader>
        <NewBook>
          <Link to={`/books/new`}> Novo Livro</Link>
        </NewBook>
        <SearchBook>
          <form onSubmit={handleSubmit}> 
            <input type="text" name="query" placeholder="Buscar Livro" onChange={handleChange} />

            <button type="submit">Buscar</button>
          </form>
        </SearchBook>
      </Header>
      <Grid>
        { grid }
      </Grid>
    </Wrapper>
  )
}

export default Books