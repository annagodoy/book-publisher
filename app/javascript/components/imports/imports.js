import React, { useState }  from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Imports = () => {

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
    <div className="imports">
      <div className="newWwriter">
        <h2> Importação de dados </h2>
        
        <form onSubmit={handleSubmit} id="importsForm">
          <div className="field">
            <input type="file" accept={".csv"} onChange={handleChange} name="file" id="uploadFile"/>
          </div>
          
          <div className="field">
            <h6> Selecione o tipo de importação </h6>
            <div className="importCategory">
              <select onChange={handleChange} name="kind" >
                { importTypes.map((options, i) => <option key={options.value} value={options.value}> { options.label } </option>) }
              </select>
            </div>
          </div>

          <button>Importar arquivo</button>
        </form>
      </div>
    </div>
  )
}

export default Imports