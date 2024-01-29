import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = doc(db, 'posts', id);
        const postSnapshot = await getDoc(postDoc);

        if (postSnapshot.exists()) {
          setPost({ id: postSnapshot.id, ...postSnapshot.data() });
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
    return <div>Loading...</div>; 
  }

  return (
    <div >
        <div className='px-32 pt-10'>
            <h1 className=' text-6xl font-bold pb-2'>{post.title}</h1>
            <p className=' text-3xl'>{post.descricao}</p>
            <div className='flex text-lg gap-1 pb-5'>
                <strong>by: </strong><p>{post.author.name}</p>
            </div>
        </div>
        <div className=' text-xl tracking-wider px-32 indent-10'>
            <p>{post.postText}</p>
        </div>
    </div>
  );
}

export default Post;
