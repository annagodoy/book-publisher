import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 160px 65px 20px 65px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`
const Header = styled.div`
  color: #efefef;
  
  h2 {
    font-size: 17px;
  }
`

const Field = styled.div `
  padding: 10px 20px;

  input {
    width: 85%;
    height: 43px;
    border-radius: 7px;
    border: 2px solid #000000;
    text-align: center;
    font-size: 14px;
  }
`

const TextField = styled.div`
  padding: 10px 20px;

  input {
    width: 85%;
    height: 100px;
    border-radius: 7px;
    border: 2px solid #000000;
    text-align: center;
    font-size: 14px;
  }
`

const BookCategory = styled.div`
  select {
    width: 80%;
    height: 44px;
    border-radius: 7px;
    border: 2px solid #000000;
    text-align: center;
    font-size: 14px;
    padding: 10px 20px;
    margin-bottom: 10px;
    color: #6d6d6d;
    margin-top: 7px;
  }
`

const Button = styled.div`
  button { 
    font-size: 18px;
    width: 25%;
    height: 40px;
    border-radius: 10px;
    margin-top: 19px;
    color: #000000;
    background: #efefef;
    border: 1px solid #efefef;
  }
`

const BookForm = (props) => {

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
    <Wrapper>
      <Header> 
        <h2> Cadastrar novo livro: </h2>
      </Header>

      <form onSubmit={props.handleSubmit} >
        <Field>
          <input type="text" name="title" placeholder="Título do Livro" onChange={props.handleChange} value={props.book.title}/>
        </Field>

        <Field>
          <input type="text" name="isbn" placeholder="ISBN" onChange={props.handleChange} value={props.book.isbn}/>
        </Field>

        <Field>
          <input type="text" name="publish_date" placeholder="Data de Publicação" onChange={props.handleChange} value={props.book.publish_date}/>
        </Field>

        <TextField>
          <input type="text" name="summary" placeholder="Resumo" onChange={props.handleChange} value={props.book.summary}/>
        </TextField>

        <BookCategory>
          <select 
            onChange={props.handleChange} 
            name="book_category_id" 
            value={props.book.book_category_id}>
            { categories.map((options, i) => <option key={options.id} value={options.id}> {options.attributes.name} </option>) }
          </select>
        </BookCategory>
        
        <Button>
          <button type="submit"> Cadastrar Livro </button>
        </Button>
      </form>
    </Wrapper>
  )
}

export default BookForm