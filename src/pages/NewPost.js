import React, { useEffect, useState } from 'react'

import {addDoc, collection} from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function NewPost({isAuth}) {

  let navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [descricao, setDescricao] = useState("")
  const [ postText, setPostText ] = useState("")

  const postCollection = collection(db, "posts")
  const createPost = async () => {
    await addDoc(postCollection, {
      title, 
      descricao,
      postText, 
      author: {name: auth.currentUser.displayName , id: auth.currentUser.uid 
      }})
    navigate("/")
  }

  useEffect(()=>{
    if (!isAuth){
      navigate("/login")

    }
  }, [])
  return (
    <div className='justify-center flex items-center'>
      <div className='text-2xl pt-5'>
        <h1>Create a Post</h1>
        <div className='p-10'> 
          <label className='pe-2'>Titutlo:</label>
          <input className='bg-black w-96 text-white p-4 rounded-full border-gray-950' placeholder='digite o titulo...' 
          onChange={(e)=>{
            setTitle(e.target.value)
            }} />
        </div>
        <div className='p-10 items-start flex'>
          <label className='pe-2'>Post:</label>
          <input className='bg-black w-96 text-white p-4 rounded border-gray-950' placeholder='descrição...' 
            onChange={(e)=>{
              setDescricao(e.target.value)
              }} />
        </div>
        <div className='p-10 items-start flex'>
          <label className='pe-2'>Post:</label>
          <textarea className='bg-black w-96 text-white p-4 rounded border-gray-950' placeholder='digite o seu post...' 
            onChange={(e)=>{
              setPostText(e.target.value)
              }} />
        </div>
        <button className=' h-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
         onClick={createPost}>submit post</button>
      </div>
    </div>
  )
}

export default NewPost