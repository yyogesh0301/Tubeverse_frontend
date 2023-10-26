import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import usericon from "../img/usericon.png"

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

const [channel, setChannel] = useState({});

useEffect(() => {
  const fetchData = async () => {
    try {
      const videoRes = await axios.get(`https://tubeverse-backend.onrender.com/api/videos/find/${path}`,{
        withCredentials: true
      });
      const channelRes = await axios.get(
        `https://tubeverse-backend.onrender.com/api/users/find/${videoRes.data.userId}`,{
          withCredentials: true
        }
      );
      setChannel(channelRes.data);
      dispatch(fetchSuccess(videoRes.data));
    } catch (err) {}
  };
  fetchData();
}, [path, dispatch]);

const handleLike = async () => {
  await axios.put(`https://tubeverse-backend.onrender.com/api/users/like/${currentVideo?._id}`,{},{
    withCredentials: true,
  });
  dispatch(like(currentUser._id));
};
const handleDislike = async () => {
  await axios.put(`https://tubeverse-backend.onrender.com/api/users/dislike/${currentVideo?._id}`,{},{
    withCredentials: true,
  });
  dispatch(dislike(currentUser._id));
};


const videoCreatedAt = new Date(currentVideo?.createdAt);
const currentTime = new Date();

const timeDifference = currentTime - videoCreatedAt;
const secondsAgo = Math.floor(timeDifference / 1000);

let timeAgoText;

if (secondsAgo < 60) {
  timeAgoText = `${secondsAgo} seconds`;
} else if (secondsAgo < 3600) {
  const minutesAgo = Math.floor(secondsAgo / 60);
  timeAgoText = `${minutesAgo} minutes`;
} else if (secondsAgo < 86400) {
  const hoursAgo = Math.floor(secondsAgo / 3600);
  timeAgoText = `${hoursAgo} hours`;
} else if (secondsAgo < 2592000) { 
  const daysAgo = Math.floor(secondsAgo / 86400);
  timeAgoText = `${daysAgo} days`;
} else {
  const monthsAgo = Math.floor(secondsAgo / 2592000); 
  timeAgoText = `${monthsAgo} months`;
}




const handleSub = async () => {
  const config = {
    withCredentials: true,
  }
  currentUser.subscribedUsers.includes(channel._id)
    ? await axios.put(`https://tubeverse-backend.onrender.com/api/users/unsub/${channel._id}`,{}, config)
    : await axios.put(`https://tubeverse-backend.onrender.com/api/users/sub/${channel._id}`,{},config);
  dispatch(subscription(channel._id));
};



  return (
    <Container>
      <Content>
        <VideoWrapper>
        <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info> {currentVideo?.views} views • {timeAgoText} ago</Info>
          <Buttons>
          <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
        <ChannelInfo>
            <Image src={channel?.img || usericon}  />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
