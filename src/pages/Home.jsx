
import styled from "styled-components";
import Card from "../components/Card";

import React, { useEffect, useState }  from "react";

import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 90%) {
    justify-content: start;
  }

  @media (min-width: 91%) {
    justify-content: space-between;
  }
 

`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`https://tubeverse-backend.onrender.com/api/videos/${type}`,{
        withCredentials: true,
      });
      setVideos(res.data);
    };
    fetchVideos();
  },[type]);
  

  
  return (
    <Container>
       {videos.map((video) => (
        <Card key ={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
