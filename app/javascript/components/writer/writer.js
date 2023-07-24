import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import Header from './header';
import BookForm from './bookForm';
import Book from './Book';

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const Column = styled.div`
  background: #fff; 
  width: 100%;
  float: left; 
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll; 
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &:last-child {
    background: black;
    border-top: 1px solid rgba(255,255,255,0.5);
  }
`

const Main = styled.div`
  padding-left: 50px;
`
const Writer = () => {
  const { id } = useParams();

  const [writer, setWriter] = useState({});
  const [loaded, setLoaded] = useState(false)

  const [book, setBook] = useState({title: '', isbn: '', publish_date: '', summary: '', book_category: '', writer: ''});
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(`/api/v1/writers/${id}`)
    .then( resp => {
      setWriter(resp.data)
      setBooks(resp.data.included)
      setLoaded(true)
    })
    .catch( resp => console.log(resp))
  }, [])

  const handleChange = (e) => {
    e.preventDefault();

    setBook(Object.assign({}, book, {[e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const writer_id = writer.data.id
    axios.post('/api/v1/books', { book, writer_id })
    .then( resp => {
      setBooks([...books, resp.data.data])
      setBook({title: '', isbn: '', publish_date: '', summary: '', book_category: '', writer: ''})
      setError('')
    })
    .catch( resp => console.log(resp))
  }

  let writerBook; 
  
  if ( loaded && books) { 
    writerBook = books.map((book, index) => {
      return (
        <Book
          key={index}
          id={book.id}
          attributes={book.attributes}
        />
      )
    })
  }

  return (
    <Wrapper>
      {  
        loaded && 
          <Fragment>
            <Column>
              <Main>
                  <Header 
                    attributes={writer.data.attributes}
                    books={writer.included}
                  />
                { writerBook }
              </Main>
            </Column>
            <Column>
              <div className="form">
                <BookForm 
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  attributes={writer.data.attributes}
                  book={book}
                />
              </div>
            </Column>
          </Fragment>
      } 
    </Wrapper>
  )
}

export default Writer