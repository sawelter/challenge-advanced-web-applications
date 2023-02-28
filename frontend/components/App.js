import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

import axiosWithAuth from '../axios'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  const navigate = useNavigate()
  const redirectToLogin = () => navigate("/");
  const redirectToArticles = () => navigate("/articles");

  const logout = () => {
    localStorage.removeItem("token");
    setMessage("Goodbye!");
    redirectToLogin();
  }

  const login = ({ username, password }) => {
    setMessage("");
    setSpinnerOn(true);
    axiosWithAuth().post('/login', {username: username, password: password})
    .then(res => {
      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token)
      setSpinnerOn(false);
      redirectToArticles();
    })
    .catch(err => console.log(err));
  }

  const getArticles = () => {
    setMessage("");
    setSpinnerOn(true);

    axiosWithAuth()
      .get("/articles")
      .then(res => {
        setMessage(res.data.message)
        setArticles(res.data.articles)
        setSpinnerOn(false);
      })
      .catch(err => {
        setSpinnerOn(false);
        setMessage(err.response.statusText)
        redirectToLogin();
      })
  }

  const postArticle = article => {
    setMessage("");
    setSpinnerOn(true);

    axiosWithAuth().post("/articles", article)
      .then(res => {
        setMessage(res.data.message);
        setSpinnerOn(false);
        getArticles();
        redirectToArticles();
      })
      .catch(err => {
        setSpinnerOn(false);
        setMessage(err.response.statusText)
        redirectToArticles();
      })
  }

  const updateArticle = ({ article_id, article }) => {
    setMessage("");
    setSpinnerOn(true);

    axiosWithAuth().put(`/articles/${article_id}`, article)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    // ✨ implement
  }

  const deleteArticle = article_id => {
    setMessage("");
    setSpinnerOn(true);

    axiosWithAuth().delete(`/articles/${article_id}`)
      .then(res => {
        setMessage(res.data.message);
        getArticles();
      })
      .catch(err => {
        setMessage(err.response.statusText)
        setSpinnerOn(false);
      })
  }



  return (
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={
            <LoginForm 
              login={login}
              setMessage={setMessage}
            />
          } />
          <Route path="articles" element={
            <>
              <ArticleForm 
                setCurrentArticleId={setCurrentArticleId}
                postArticle={postArticle}
                updateArticle={updateArticle}
              />
              <Articles 
                articles={articles}
                getArticles={getArticles}
                deleteArticle={deleteArticle}
                setCurrentArticleId={setCurrentArticleId}
                currentArticleId={currentArticleId}
              />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
