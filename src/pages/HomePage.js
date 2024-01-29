import React, { useEffect, useState } from 'react'
import {deleteDoc, getDocs, doc  } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { collection} from 'firebase/firestore'



function HomePage( {isAuth} ) {
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
    <div>
      {postList.map((post) => {
      
        return (
          <div className='justify-center  flex  pt-3'>
              <div className=' pt-4 text-center  w-56 bg-green-300'>
              <h1>Titulo: {post.title}</h1>
              <p>{post.postText}</p>
              <p>{post.author.name}</p>
              <div className='deletePost'>
                {
                  isAuth && post.author.id === auth.currentUser.uid &&
                <button className=' h-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={() => {deletePost(post.id)}}>deletar</button>
                }
              </div>
              <br></br>
            </div>
          </div>)
      })}
    </div>
  )
}

export default HomePage