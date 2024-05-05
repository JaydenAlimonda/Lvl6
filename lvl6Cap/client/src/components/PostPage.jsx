import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';

function PostPage() {
  const { id } = useParams(); // get post ID
  const [post, setPost] = useState(null); // State to store post data
  const [commentInput, setCommentInput] = useState({ author: '', content: '' }); // State to manage comment input
  const [comments, setComments] = useState([]); // State to store comments

  // get post and comments data 
  useEffect(() => {
    axios.get(`/api/tradeposts/${id}`)
      .then(res => {
        setPost(res.data); // Set post data
        setComments(res.data.comments); // Set comments data
      })
      .catch(err => console.log(err));
  }, [id]);

  // Function to handle comment submit
  const handleCommentSubmit = (e) => {
    e.preventDefault(); 
    if (commentInput.content.trim() === '') return; // Ignore empty comments



    axios.post(`/api/tradeposts/${id}/comments`, commentInput)
      .then(res => {
        setComments(prevComments => [...prevComments, res.data.comments[res.data.comments.length - 1]]); // Add new comment to the comments list
        setCommentInput({ author: '', content: '' }); // Clear comment input fields
      })
      .catch(err => console.log(err));
  };



  // Function to delete a comment
  const deleteComment = (commentId) => {
    axios.delete(`/api/tradeposts/${id}/comments/${commentId}`)
      .then(res => {
        setComments(res.data.comments); // Update comments list after deletion
      })
      .catch(err => console.log(err));
  };



  // Function to edit a comment
  const editComment = (commentId, updatedContent) => {
    axios.put(`/api/tradeposts/${id}/comments/${commentId}`, { content: updatedContent}) //update DB
      .then(res => {
        setComments(res.data.comments); // Update comments list after editing
      })
      .catch(err => console.log(err));
  };
  


  if (!post) {
    return <div>Loading...</div>; // Display loading message until post data is fetched
  }


  
  return (
    <div className='post--page--container'>
      <h1>{post.offer}</h1>
      <p>{post.price}</p>
      <p>{post.location}</p>
      <p>{post.author}</p>
      <p>{post.contact}</p>

      <h2>Comments</h2>
      <div>
        {comments.map(comment => (
          <Comment
            key={comment._id}
            {...comment}
            postId={id}
            deleteComment={deleteComment}
            editComment={editComment}
          />
        ))}
      </div>

      {/* Form for submitting new comments */}
      <form onSubmit={handleCommentSubmit}>
        <input type="text" value={commentInput.author} onChange={(e) => setCommentInput({...commentInput, author: e.target.value})} placeholder="Your Name" />
        <input type="text" value={commentInput.content} onChange={(e) => setCommentInput({...commentInput, content: e.target.value})} placeholder="Add a comment..." />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostPage;
