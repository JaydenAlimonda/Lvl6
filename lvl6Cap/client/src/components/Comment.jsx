import React, { useState } from 'react';
import axios from 'axios';

function Comment({ _id, author, content, postId, deleteComment, editComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);

  const handleDelete = () => {
    deleteComment(_id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    editComment(_id, updatedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedContent(content);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input type="text" value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>{author}</strong>: {content}</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Comment;
