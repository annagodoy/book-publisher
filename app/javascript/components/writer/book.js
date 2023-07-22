import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import styled from 'styled-components';

const Book = (props) => {
  const { title, isbn, publish_date, summary, book_category } = props.attributes

  return(
    <div className="card">
      <div className="title"> {title} </div>
      <div className="summary"> {summary} </div>
      <div className="book-category">{ book_category }</div>
      <div className="publish-date"> {publish_date} </div>
      <div className="isbn"> {isbn} </div>
    </div> 
  )
}

export default Book