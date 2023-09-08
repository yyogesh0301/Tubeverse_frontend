import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import userIcon from '../img/usericon.png';
const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;



const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState(""); // Step 2

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`, {
          withCredentials: true,
        });
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);


  const handleCommentTextChange = (e) => {
    setNewCommentText(e.target.value);
  };

 
  const submitComment = async () => {
    try {
      const res = await axios.post(
        `/comments/${videoId}`,
        {
          text: newCommentText,
        },
        { withCredentials: true }
      );
      
      setComments([...comments, res.data]);
      setNewCommentText("");
    } catch (err) {}
  };

  return (
    <Container>
      <NewComment>
      <Avatar src={currentUser.img ? currentUser.img : userIcon} />
        <Input
          placeholder="Add a comment..."
          value={newCommentText} // Controlled input
          onChange={handleCommentTextChange} // Step 3
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              submitComment(); // Submit on Enter key press
            }
          }}
        />
        <button  onClick={submitComment}>Add</button> {/* Add a Submit button */}
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
