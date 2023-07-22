import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Book = () => {

  const { id } = useParams();

  const [book, setBook] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/books/${id}`)
    .then(resp => {
      console.log(resp.data.data)
      setBook(resp.data.data)
      setLoaded(true)
    })
    .catch(resp => console.log(resp))
  }, [])

  return(
    <div className="wrapper">
      { 
        loaded  && 
        <Fragment> 
          <div className="container">
            <div className="title">
              <h2> { book.attributes.title } </h2>
            </div>
            <div className="info">
              <h4> { book.attributes.writer } </h4>
              <p> { book.attributes.book_category} </p>
              <p> { book.attributes.publish_date } </p>
              <p> { book.attributes.summary } </p>
            </div>
          </div>
        </Fragment> 
      }
    </div>
  )
}

export default Book