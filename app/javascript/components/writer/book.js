import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import styled from 'styled-components';

const Card = styled.div`
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #efefef;
  margin-bottom: 25px;
  padding: 0 15px 0 15px;
`

const Title = styled.div`
  padding: 20px 30px 20px 30px;
  font-size: 19px;
  font-weight: bold;

`
const Info = styled.div`
  b {
    color: #6d6d6d;
    font-weight: 300;
  }

  p {
    font-size: 14px;
    margin-top: 0px;
  }
`

const Summary = styled.div``
const Category = styled.div``
const Isbn = styled.div``

const Book = (props) => {
  const { title, isbn, publish_date, summary, book_category } = props.attributes

  return(
    <Card>
      <Title> {title} </Title>
      <Info>
        <p> <b>Publicado em</b> {publish_date} </p>
        <p> <b>Categoria:</b> { book_category } </p>
        <p><b>Sinopse:</b> {summary} </p>
        <p><b>ISBN:</b> {isbn} </p>
      </Info>
    </Card> 
  )
}

export default Book