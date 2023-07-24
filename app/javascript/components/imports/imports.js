import React, { useState, useEffect }  from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 2rm;
  }
`

const Field = styled.div `
  padding: 10px 20px;

  input {
    width: 50%;
    height: 43px;
    border-radius: 7px;
    border: 2px solid #000000;
    text-align: center;
    font-size: 14px;
    color: #6d6d6d;
  }

 input[type="file"]::file-selector-button {
    background: #6d6d6d; 
    color: #efefef;
    border-radius: 4px;
    border: 0.7px solid #6d6d6d;
    height: 22px;
    margin-left: 200px;
    margin-top: 10px
  }

  select {
    width: 50%;
    height: 43px;
    border-radius: 7px;
    border: 2px solid #000000;
    text-align: center;
    font-size: 14px;
    padding: 10px 20px;
    margin-bottom: 10px;
    color: #6d6d6d;
  }
`

const Button = styled.div`
  button { 
    font-size: 18px;
    width: 20%;
    height: 45px;
    border-radius: 12px;
    margin-top: 15px;
    color: #efefef;
    background: #000000;
    border: 1px solid #000000;
  }
`

const Imports = () => {

  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/v1/imports')
    .then( resp => {
      debugger
      setSession(resp.data.data)
    })
    .catch( resp => { 
      if (resp.response.status == 401 || resp.response.status == '401'){
        navigate('/login')
      }
    })
  }, [])

  let importTypes = [
    {label: 'Tipo de importação', value: ''},
    {label: 'Autores', value: 'writer'},
    {label: 'Livros', value: 'book'}
  ]

  const [file, setFile] = useState();

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(document.getElementById("importsForm"));

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

    var imports = {}

    for (const pair of formData.entries()){
      var key = pair[0];
      var val = pair[1]
      
      imports[key] = val
    }

    axios.post('/api/v1/imports', { imports })
    .then( resp => {
      alert('Importação concluída.')
    })
    .catch( resp => console.log(resp))
  }

  return (
    <Wrapper>
      <h2> Importação de dados </h2>
        
      <form onSubmit={handleSubmit} id="importsForm">
        <Field>
          <input type="file" accept={".csv"} onChange={handleChange} name="file" id="uploadFile"/>
        </Field>
        
        <Field>
          <div className="importCategory">
            <select onChange={handleChange} name="kind" >
              { importTypes.map((options, i) => <option key={options.value} value={options.value}> { options.label } </option>) }
            </select>
          </div>
        </Field>

        <Button>
          <button>Importar arquivo</button>
        </Button>
      </form>

    </Wrapper>
  )
 
}

export default Imports