import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 50px 65px 20px 65px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 36px;
    margin-bottom: 0px
  }
`

const TotalBooks = styled.div`
  font-size: 16px;
  padding: 10px 0;
  color: #6d6d6d;
`

const Header = (props) => {
  const { id, name } = props.attributes
  const total = props.books.length

  return (
     <Wrapper>
       <h2> { name } </h2>
       <TotalBooks> { total } livros cadastrados </TotalBooks>
     </Wrapper>
  )
}

export default Header