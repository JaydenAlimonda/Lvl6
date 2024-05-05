import React from "react";
import axios from "axios"
import { useState } from "react";

export const Context = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export const ContextProvider = (props) => {

    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "", 
        posts: [],
        errMsg: ''
    }

    const[userState, setUserState]= useState(initState)

    function signup(credentials) {
        axios.post('/api/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user, token
                }))
                console.log(userState)
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }
    console.log(userState)
    function login(credentials) {
        axios.post('/api/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user, token
                }))
            })
            .catch(err => console.log(err))
    }
    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: "",
            posts: []
        })
    }
    function handleAuthErr(errMsg) {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }
    function resetAuthErr() {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        })
        )
    }
    const [postBoard, setPostBoard] = useState([]);

  const getPosts = () => {
    userAxios.get("/api/tradeposts")
    .then(res => setPostBoard(res.data))
    .catch(err => console.log(err))
  }

  // Add post and add to state
  
  const addPost = (newPost) => {
    userAxios.post("/api/tradeposts", newPost)
    .then(res => {
      setPostBoard( () => [ ...postBoard, res.data ])
    })
    .catch(err => console.log(err))
  }

  // Delete post and filter out of state
  
  const deletePost = (_id) => {
    userAxios.delete(`/api/tradeposts/${_id}`)
    .then(res => {
        setPostBoard(prev => prev.filter(post => post._id !== _id))
      })
      .catch(err => console.log(err))
    }

    // Update DB and update state
    
    const editPost = (update, _id) => {
      userAxios.put(`/api/tradeposts/${_id}`, update)
      .then(res => {
        setPostBoard(prev => prev.map(post => post._id !== _id ? post : res.data))
      })
      .catch(err => console.log(err))
    }


    return (
        < Context.Provider value={{
            login,
            signup,
            logout,
            handleAuthErr,
            resetAuthErr,
            ...userState,
            getPosts,
            postBoard,
            addPost,
            editPost,
            deletePost       

        }}>
            {props.children}


        </Context.Provider>
    )




}