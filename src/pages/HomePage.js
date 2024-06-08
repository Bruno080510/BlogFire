import React, { useEffect, useState } from 'react'
import {deleteDoc, getDocs, doc  } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { collection} from 'firebase/firestore'

import { FaTrashAlt } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";


import { Link, Navigate, useNavigate } from 'react-router-dom'



function HomePage( {isAuth} ) {
let navigate = useNavigate()

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
    navigate("/")
  }



  return (
      <div className="pt-12">
          <div>
            
              <div>
                  <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
                      Descubra o que os outros estão pensando...
                  </h1>
                  <p className="text-xl text-center text-gray-600 px-10">
                      Se divirta navegando e descobrindo o que os outros andam
                      postando de relevante, e não se esqueça de compartilhar
                      suas ideias também!
                  </p>
              </div>

              <div className=" flex justify-center items-center">
                  <img
                      className=" w-[400px]"
                      src="https://img.freepik.com/free-vector/design-inspiration-concept-illustration_114360-3992.jpg?w=740&t=st=1706731556~exp=1706732156~hmac=a30c48eb977cfcdcc9be7ff59c9753175865a4bb3bfc6b13ceae6f47f46f9780"
                  />
              </div>
          </div>
          <div className="pt-24 font-bold text-center text-5xl">
              <h1>Navegue por diversos blogs e se divirta!</h1>
          </div>
          <div className="flex gap-8 p-10 ">
              <div className="fixed bottom-4 right-4">
                  <Link
                      to="/new"
                      className="flex items-center  p-6 pe-12 rounded-full text-black"
                  >
                      <IoIosCreate size="50px" />
                  </Link>
              </div>
              <div className="flex flex-wrap justify-between">
    {postList.map((post) => {
        return (
            <div className="w-1/3 p-2">
                <div className="flex w-full object-cover h-[510px] pt-3">
                    <div className="pt-4 p-4 cursor-pointer w-full rounded-xl bg-slate-200">
                        {isAuth ? (
                            <div
                                onClick={() => {
                                    navigate(`/post/${post.id}`);
                                }}
                            >
                                            <img
                                    className="rounded-lg object-cover w-full h-60"
                                    src={post.image}
                                    alt="Post Image"
                                />
                                <h1 className="pt-2 font-bold text-2xl">{post.title}</h1>
                                <p className="text-lg pt-2">{post.descricao}</p>
                                <p className="font-semibold">by: {post.author.name}</p>
                            
                        <div className="">
                            {isAuth && post.author.id === auth.currentUser.uid && (
                                <button
                                    className="h-12 text-white"
                                    onClick={() => {
                                        deletePost(post.id);
                                    }}
                                >
                                    <FaTrashAlt size="30px" color="red" />
                                </button>
                            )}
                        </div>
                        
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    navigate("/login");
                                }}
                            > <img
                            className="rounded-lg object-cover w-full h-60"
                            src={post.image}
                            alt="Post Image"
                        />
                        <h1 className="pt-2 font-bold text-2xl">{post.title}</h1>
                        <p className="text-lg pt-2">{post.descricao}</p>
                        <p className="font-semibold">by: {post.author.name}</p>
                    
                <div className="">
                    {isAuth && post.author.id === auth.currentUser.uid && (
                        <button
                            className="h-12 text-white"
                            onClick={async () => {
                                await deletePost(post.id)
                               let url = window.location.href
                               console.log(url)
                               url = "/"
                               navigate("/")
                            }}
                        >
                            
                            
                            <FaTrashAlt size="30px" color="red" />
                        </button>
                    )}
                </div></div>
                            
                        )}
                    
                    </div>
                </div>
            </div>
        );
    })}
</div>
          </div>
      </div>
  );
}

export default HomePage