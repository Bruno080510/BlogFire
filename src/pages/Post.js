import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, getDocs, where, query, deleteDoc } from 'firebase/firestore';

import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


import {addDoc, collection} from 'firebase/firestore'
import { db, auth } from '../firebase'

function Comentario({ id, postCollection }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const navigate = useNavigate();

  const createComentario = async () => {
    if(comment == ""){
     
    }else{

      await addDoc(postCollection, {
        postId: id,
        comment,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      });
  
      setCommentList([...commentList, { comment, author: { name: auth.currentUser.displayName, id: auth.currentUser.uid } }]);      setComment("");
      console.log("Depois de setComment:", comment);
    }
  };

  useEffect(() => {
    const getComment = async () => {
      const querySnapshot = await getDocs(query(postCollection, where('postId', '==', id)));
      setCommentList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getComment();
  }, [id, postCollection]);

  const deleteComentario = async (id, authorId) => {

      const postDoc = id ? doc(db, "comentario", id) : null;

if (postDoc) {
  await deleteDoc(postDoc);
  navigate(`/post/${Post.id}`);
  
} else {
  console.error("ID do comentário é inválido.");
}
    
  }

  return (
      <div className="px-32 pt-8">
          <h1 className=" text-4xl pb-4">Deixe um feedback do que achou!!</h1>
          <div>
              <input
                  className=" bg-slate-300 w-[550px] text-black p-4 rounded border-gray-950"
                  placeholder="Comentario..."
                  onChange={(e) => setComment(e.target.value)}
              />
              <div className="py-3">
                  <button
                      className="h-12 font-semibold text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 
            rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      onClick={createComentario}
                  >
                      Comentar
                  </button>
              </div>
          </div>
          <div className="flex-col flex gap-8 py-5">
              <h1 className=" text-2xl font-bold">Comentários</h1>
              {commentList.map((comment) => (
                  <div>
                      <div
                          key={comment.id}
                          className="bg-slate-300 max-w-[600px] flex flex-row items-center p-4 h-auto rounded-lg flex-grow overflow-x-hidden"
                      >
                          <h1 className="w-full">{comment.comment}</h1>
                          {comment.author.id === auth.currentUser.uid && (
                              <button
                                  className="h-12 text-white"
                                  onClick={() => {
                                      deleteComentario(
                                          comment.id,
                                          comment.author.id
                                      );
                                  }}
                              >
                                  <FaTrashAlt size="30px" color="red" />
                              </button>
                          )}
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
}

export  {Comentario};


function Post({commentList}) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [contador, setContador] = useState(0)
  const postCollection = collection(db, "comentario");

  function SomaHeart(){
    if(localStorage.getItem("liked") == false || localStorage.getItem("liked") == null){
      setContador(contador+1)
      localStorage.setItem("liked", true)
    }
    else{
      console.log("oiii")
      localStorage.removeItem("liked")
    }

  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = doc(db, 'posts', id);
        const postSnapshot = await getDoc(postDoc);

        if (postSnapshot.exists()) {
          setPost({ id: postSnapshot.id, ...postSnapshot.data() });
          window.scrollTo(0, 0); 
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);


  if (!post) {
    return <div className=' flex text-center items-center p-72 justify-center'>
<div class="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-black" /></div>; 
  }

  return (
    <div className='p-5 ' >
        <div className='px-32  pt-10'>
            <h1 className=' text-6xl font-bold pb-2'>{post.title}</h1>
            <p className=' text-3xl'>{post.descricao}</p>
            <div className='flex text-lg gap-1 pb-5'>
                <strong>by: </strong><p>{post.author.name}</p>
            </div>
            <div className=' flex items-center gap-7'>
              <div className='flex gap-2'>
                <FaRegHeart onClick={SomaHeart} className='cursor-pointer' size='30px'/>
                <p >{contador}</p>
              </div>
              <a href='#comentario'>
                <FaRegComment className='cursor-pointer' size='30px' />
                <p>{postCollection.lenght}</p>
              </a>
            </div>
        </div>
        <div className='flex items-center rounded-lg justify-center'>
          <img className='p-8 w-[1100px] object-cover h-[700px] ' src={post.image}></img>
        </div>
        <div className=' text-xl  leading-relaxed  tracking-wider px-32 indent-10'>
            <p>{post.postText}</p>
        </div>
        <section  id='comentario'>
          <Comentario id={id} className="comentario" postCollection={postCollection} /> 
        </section>
    </div>
  );
}

export default Post;
