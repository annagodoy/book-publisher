import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Login from '../sessions/login';

const IndexPage = (props) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/v1/logged_in')
    .then( resp => {
      setUser(resp.data.user)
      setSession(resp.data.logged_in)
    })
  }, []);

  const handleSuccessfulAuth = (data) => {
    if (data.logged_in) {
      navigate('/home')
    }
  }

  if ( session && user ) { 
    navigate('/home')
  } else {
    return (
      <Fragment>
        <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      </Fragment>
    )
  }
}

export default IndexPage