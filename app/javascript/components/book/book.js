import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const Title = styled.div `
  padding: 30px 30px 5px 30px;
  margin-top: 30px;
  
  h2 {
    font-size: 37px;
    font-weight: 600;
  }

   h4 {
    margin-top: 0px;
    font-size: 16px;
    font-weight: bold;
  }

  b {
    color: #6d6d6d;
    font-weight: 300;
  }

  p {
    color: #6d6d6d;
  }
`

const Info = styled.div `
  b {
    color: #6d6d6d;
  }

  p {
    font-weight: 400;
  }

`

const Book = () => {

  const { id } = useParams();

  const [book, setBook] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/books/${id}`)
    .then(resp => {
      setBook(resp.data.data)
      setLoaded(true)
    })
    .catch(resp => console.log(resp))
  }, [])

  return(
    <Wrapper>
      { 
        loaded  && 
        <Fragment> 
          <Title>
            <h2> { book.attributes.title } </h2>
            <h4> <b>por</b> { book.attributes.writer } </h4>
            <p>{ book.attributes.publish_date }</p>
          </Title>

          <Info>
            <p> <b>Categoria:</b> { book.attributes.book_category} </p>
            <p> <b>Sinopse:</b> { book.attributes.summary } </p>
          </Info>
        </Fragment> 
      }
    </Wrapper>
  )
}

export default Book