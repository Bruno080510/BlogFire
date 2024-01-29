import React, { useEffect, useState } from 'react'
import {deleteDoc, getDocs, doc  } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { collection} from 'firebase/firestore'

import { FaTrashAlt } from "react-icons/fa";

import { Link, Navigate, useNavigate } from 'react-router-dom'



function HomePage( {isAuth} ) {
const navigate = useNavigate()

  const [postList, setPostList] = useState([])
  const postCollection = collection(db, "posts")


  useEffect(()=>{
    const getPosts = async () =>{
      const data = await getDocs(postCollection)
      setPostList(data.docs.map((docs) => ({...docs.data(), id: docs.id})))
    }

    getPosts()
  }, [])

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
    window.location.reload(false);
  }


 
  return (
    <div className='flex gap-4 p-10'>
      {postList.map((post) => {
      
        return (
          <div>
          <div className='  flex  pt-3'>
              <div className=' pt-4 p-4  cursor-pointer w-96 rounded-xl bg-green-300'  >
                <div onClick={(()=>{navigate(`/post/${post.id}`)})}>
                  <h1 className=' font-bold text-xl'>{post.title}</h1>
                  <p>{post.descricao}</p>
                  <p className=' font-semibold'>by: {post.author.name}</p>
                </div>
              <div className='deletePost'>
                {
                  isAuth && post.author.id === auth.currentUser.uid &&
                <button className=' h-12 text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={() => {deletePost(post.id)}}><FaTrashAlt /></button>
                }
              </div>
              <br></br>
            </div>
          </div>
          </div>)
      })}
    </div>
  )
}

export default HomePage