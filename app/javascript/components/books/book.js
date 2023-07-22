import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Book = (props) => {
  const { id, title, isbn, publish_date, summary, book_category, writer } = props.attributes

  return (
    <div className="card">
      <div className="book-title">{title}</div>
      <div className="book-writer">{writer}</div>
      <div className="book-category">{book_category}</div>
      <div className="book-link">
        <Link to={`/books/${id}`}>Ver Livro</Link>
      </div>
    </div>
  )
}

export default Book