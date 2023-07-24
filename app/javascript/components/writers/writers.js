import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import WriterElement from './writer';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const Header = styled.div`
  padding: 100px 100px 10px 100px

  h1 {
    font-size: 42px
  }
`

const Subheader = styled.div`
  font-weight: 300;
  font-size: 26px;
  padding: 10px 10px 30px 10px
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px 20px 45px 20px;
`

const NewWriter = styled.div`

  a {
    color: #ffffff;
    background: #000000;
    border-radius: 4px;
    padding: 10px 50px;
    width: 100%;
    text-decoration: none
  }
  
`

const Writers = () => {
  const [ writers, setWtriters] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/writers.json')
    .then( resp => setWtriters(resp.data.data) )
    .catch( resp => console.log(resp) )
  }, [])

  const grid = writers.map(item => {
    return (
      <WriterElement 
        key={item.attributes.id}
        attributes={item.attributes}
      />
    )
  })

  return (
    <Container>
      <Header>
        <h1>Autores</h1>
        <Subheader>
          Lista de Autores
        </Subheader>
      </Header>

      <Grid>
        { grid }
      </Grid>

      <NewWriter>
        <p>
          <Link to={`/writers/new`}> Adicionar Autor</Link>
        </p>
      </NewWriter>
    </Container>

    
  )
}

export default Writers