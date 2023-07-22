import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 50px 100px 50px 0;
  font-size: 30px;
`

const TotalBooks = styled.div`
  font-size: 18px;
  padding: 10px 0;
`

const Header = (props) => {
  const { id, name } = props.attributes
  const total = props.books.length

  return (
     <Wrapper>
       <h2> { name } </h2>
       <TotalBooks> { total } Livros </TotalBooks>
     </Wrapper>
  )
}

export default Header