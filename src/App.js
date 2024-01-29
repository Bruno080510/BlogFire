import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import NewPost from './pages/NewPost';
import { useState } from 'react';
import {signOut} from 'firebase/auth'
import { auth } from './firebase';
import Post from './pages/Post';
import { FaUserCircle } from "react-icons/fa";


import './App.css'




function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

  function Logout (){
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }
  return (
    <Router>
      <nav className=' flex justify-between w-full h-24 text-white text-2xl text-center items-center  bg-black'>
        <Link to="/" className='px-3'>Home</Link>
        {
          isAuth === "true" ?
          <Link to="/new">Create Post</Link> :
          <></>
        }
        {
           !isAuth ? 
        <Link to="/login" className='px-3'><FaUserCircle/></Link> : <Link to="/" onClick={Logout} className='px-5'><FaUserCircle/> Logout</Link>
        }
      </nav>
      <Routes>
        <Route path='/' element={<HomePage isAuth={isAuth}/>} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>} />
        <Route path='/new' element={<NewPost isAuth={isAuth}/>} />
        <Route path='/post/:id' element={<Post/>}/>
      </Routes>
    </Router>
  );
}

export default App;
