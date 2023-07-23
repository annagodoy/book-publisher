import React, { useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from './sessions/signUp';
import Login from './sessions/login';
import IndexPage from './home/indexPage';
import Home from './home/home';
import Imports from './imports/imports';
import Writers from './writers/writers';
import NewWriter from './writers/newWriter';
import NewBook from './books/newBook';
import Writer from './writer/writer';
import Books from './books/books';
import Book from './book/book';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<IndexPage/>} />

      <Route path={"/signup"} element={<SignUp/>} />
      <Route path={"/login"} element={<Login/>} />

      <Route path={"/home"} element={<Home/>} />

      <Route path={"/writers"} element={<Writers/>} />
      <Route path={"/writers/:id"} element={<Writer/>} />
      <Route path={"/writers/new"} element={<NewWriter/>} />

      <Route path={"/books"} element={<Books/>} />
      <Route path={"/books/:id"} element={<Book/>} />
      <Route path={"/books/new"} element={<NewBook/>} />
      
      <Route path={"/imports"} element={<Imports/>} />
    </Routes>
  )
}

export default App