import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import About from './components/About';
import PostPage from './components/PostPage';
import axios from 'axios';
import Auth from './components/Auth';
import { useContext } from 'react';
import { Context } from './context/ContextProvider';

const App = () => {
  const{token, logout, getPosts, postBoard}=useContext(Context)
  // Get all posts and set state
  

  
    // Get posts init for page

    useEffect(() => {
      getPosts();
    }, [token]);
  
    return (
      <Router>

      <h1>Appalachian Trade</h1>

     { token && <nav className='nav--container'>
        <Link to='/home' className='navlink'>
          Home
        </Link>
        <Link to='/createPost' className='navlink'>
          Create Post
        </Link>
        <Link to='/about' className='navlink'>
          About
        </Link>
        <button onClick={logout}>logout</button>
      </nav>}


      <Routes>

      
        <Route path="/" element={!token?<Auth/>:<Navigate to='/home'/>}/>
      
      <Route path='/home' element={ token?
          <div className='post--container'>
            {postBoard.map(post => (
              <div key={post._id} className='trade--posts'>
                <Home 
                  {...post}
                />
              </div>
            ))}
          </div>: <Navigate to='/'/>
        } />

        <Route path='/createPost' element={<CreatePost btnTxt="Submit" />} />
        <Route path='/about' element={<About />} />
        <Route path='/post/:id' element={<PostPage />} /> {/* Route for individual item pages */}

      </Routes>

    </Router>
  )
}

export default App;
