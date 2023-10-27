import React ,{useEffect,useState}from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import usericon from '../img/usericon.png';
import { useSelector } from "react-redux";

const Container = styled.div`
  width: ${(props) => (props.type !== "sm" ? "355px" : null)};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  margin-right :18px;
  display: ${(props) => (props.type === "sm" ? "flex" : null)};
  gap: 10px;

`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type ,video}) => {
  const [channel, setChannel] = useState({});

  const [showLoginMessage, setShowLoginMessage] = useState(false); // State for showing the login message

  // Access the currentUser state from Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`https://tubeverse-backend.onrender.com/api/users/find/${video.userId}`,{ withCredentials: true });
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  const [timeAgo, setTimeAgo] = useState('');


  const handleVideoClick = () => {
    // Check if a user is logged in (currentUser exists in Redux state)
    if (!currentUser) {
      setShowLoginMessage(true); // Show the login message if not logged in
    }
  };
  useEffect(() => {
 
    const videoCreatedAt = new Date(video?.createdAt);
    const currentTime = new Date();

    const timeDifference = currentTime - videoCreatedAt;
    const secondsAgo = Math.floor(timeDifference / 1000);

    if (secondsAgo < 60) {
      setTimeAgo(`${secondsAgo} seconds ago`);
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      setTimeAgo(`${minutesAgo} minutes ago`);
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      setTimeAgo(`${hoursAgo} hours ago`);
    } else if (secondsAgo < 2592000) { 
      const daysAgo = Math.floor(secondsAgo / 86400);
      setTimeAgo(`${daysAgo} days ago`);
    } else {
      const monthsAgo = Math.floor(secondsAgo / 2592000); 
      setTimeAgo(`${monthsAgo} months ago`);
    }
    
  }, [video.createdAt]);

  return (
    <div>
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video?.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel?.img || usericon}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>{video.views} views • {timeAgo}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
    {showLoginMessage && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <div>
            Please login to watch videos.
            <button onClick={() => setShowLoginMessage(false)}>Close</button>
          </div>
        </div>
      )}
      </div>
  );
};

export default Card;

