import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

const BookCard = styled.div`
  border: 1px solid #efefef;
  background: #fffff
`

const BookInfo = styled.div`
  padding: 20px 0 10px 0;
`

const BookLink = styled.div`
  margin: 30px 20px 0;
  height: 50px;
  
  a {
    color: #ffffff;
    background: #000000;
    border-radius: 4px;
    padding: 10px 50px;
    width: 100%;
    text-decoration: none
  }
`

const Book = (props) => {
  const { id, title, isbn, publish_date, summary, book_category, writer } = props.attributes

  return (
    <BookCard>
      <BookInfo>{title}</BookInfo>
      <BookInfo>{writer}</BookInfo>
      <BookInfo>{book_category}</BookInfo>
      <BookLink>
        <Link to={`/books/${id}`}>Ver Livro</Link>
      </BookLink>
    </BookCard>
  )
}

export default Book