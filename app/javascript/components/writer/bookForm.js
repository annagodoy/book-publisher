import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BookForm = (props) => {
  // const Wrapper = styled.div``
  // const Field = styled.div``
  // const BookCategory = styled.div``

  const [categories, setCategories] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios.get('/api/v1/book_categories.json')
    .then( resp => {
      setCategories(resp.data.data)
      setLoaded(true)
    })
    .catch( resp => console.log(resp) )
  }, [])

  return (
    <div className="wrapper">
      <form onSubmit={props.handleSubmit} >

        <div> Cadastrar novo livro para {props.attributes.name} : </div>
        <div className="field">
          <input type="text" name="title" placeholder="Título do Livro" onChange={props.handleChange} value={props.book.title}/>
        </div>

        <div className="field">
          <input type="text" name="isbn" placeholder="ISBN" onChange={props.handleChange} value={props.book.isbn}/>
        </div>

        <div className="field">
          <input type="text" name="publish_date" placeholder="Data de Publicação" onChange={props.handleChange} value={props.book.publish_date}/>
        </div>

        <div className="field">
          <input type="text" name="summary" placeholder="Resumo" onChange={props.handleChange} value={props.book.summary}/>
        </div>

        <div className="field">
          <div className="bookCategory">
            <select 
              onChange={props.handleChange} 
              name="book_category_id" 
              value={props.book.book_category_id}>
              { categories.map((options, i) => <option key={options.id} value={options.id}> {options.attributes.name} </option>) }
            </select>
          </div>
        </div>

        <button type="submit"> Cadastrar Livro </button>
      </form>
    </div>
  )
}

export default BookForm