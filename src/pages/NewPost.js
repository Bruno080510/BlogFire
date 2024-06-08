import React, { useEffect, useState } from 'react'

import {addDoc, collection} from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function NewPost({isAuth}) {

  let navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [descricao, setDescricao] = useState("")
  const [ postText, setPostText ] = useState("")
  const [image, setImage] = useState()

  const postCollection = collection(db, "posts")
  const createPost = async () => {
    await addDoc(postCollection, {
      title, 
      descricao,
      postText,
      image,
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
   
    <div className=' flex ps-16 pt-10 items-center' onChange={window.scrollTo(0, 0)}>
      <div className='text-2xl pt-5'>
        <h1>Deixe seus pensamentos fluir</h1>
        <div className='p-4'> 
          <p className='pe-2 py-3'>Titutlo</p>
          <input className=' bg-gray-300 w-[1000px] text-black p-4 rounded-xl border-gray-950' placeholder='digite o titulo...' 
          onChange={(e)=>{
            setTitle(e.target.value)
            }} />
        </div>
        <div className='p-4 items-start '>
          <p className='pe-2 py-3'>Descrição</p>
          <input className='bg-gray-300 w-[1000px] text-black p-4 rounded-xl border-gray-950' placeholder='Descrição...' 
            onChange={(e)=>{
              setDescricao(e.target.value)
              }} />
        </div>
        <div className='p-4 items-start '>
          <p className='pe-2 py-3'>Post</p>
          <textarea className='bg-gray-300 w-[1000px] text-black p-4 h-80 rounded-xl border-gray-950' placeholder='digite o seu post...' 
            onChange={(e)=>{
              setPostText(e.target.value)
              }} />
        </div>
        <div className='p-4'> 
          <p className='pe-2 py-3'>Link Image</p>
          <input className='bg-gray-300 w-[1000px] text-black p-4 rounded-xl border-gray-950' placeholder='Link da imagem...' 
          onChange={(e)=>{
            setImage(e.target.value)
            }} />
        </div>
       
        <button className=' h-12 text-white bg-gray-800 hover:bg-gray-900 
        focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
         rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
          dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
         onClick={createPost}>submit post</button>
      </div>
    </div>
  )
}

export default NewPost