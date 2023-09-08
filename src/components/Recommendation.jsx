import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;

  @media (max-width: 768px) {
    display: none; // Hide when screen width is less than 768px
  }
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);


  const [recvisible, setrecvisible] = useState(true);

  
  const toggleMenu = () => {
    setrecvisible(!recvisible);
  };
  return (

    <Container  recvisible={recvisible}>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;