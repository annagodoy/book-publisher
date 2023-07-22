import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import styled from 'styled-components';

const WriterCard = styled.div`
  border: 1px solid #efefef;
  background: #fffff
`

const WriterName = styled.div`
  padding: 20px 0 10px 0;
`

const WriterLink = styled.div`
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

const WriterElement = (props) => {
  return (
    <WriterCard>
      <WriterName>{props.attributes.name}</WriterName>
      <WriterLink>
        <Link to={`/writers/${props.attributes.id}`}>Ver Mais</Link>
      </WriterLink>
    </WriterCard>
  )
}

export default WriterElement