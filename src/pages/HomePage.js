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
    <div className='flex gap-8 p-10 '>
      {postList.map((post) => {
      
        return (
          <div>
          <div className='  flex w-96  object-cover h-[510px] pt-3'>
              <div className=' pt-4 p-4  cursor-pointer w-96 rounded-xl  bg-slate-200'  >
                <div onClick={(()=>{navigate(`/post/${post.id}`)})}>
                  <img className='rounded-lg object-cover w-full h-60' src={post.image}></img>
                  <h1 className=' font-bold text-2xl'>{post.title}</h1>
                  <p className='text-lg pt-2'>{post.descricao}</p>
                  <p className=' font-semibold'>by: {post.author.name}</p>
                </div>
              <div className='deletePost'>
                {
                  isAuth && post.author.id === auth.currentUser.uid &&
                <button className=' h-12 text-white' onClick={() => {deletePost(post.id)}}><FaTrashAlt size="30px" color='red' /></button>
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