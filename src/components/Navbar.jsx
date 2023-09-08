import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useNavigate } from 'react-router-dom';
import Upload from "./Upload";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { logout } from "../redux/userSlice"
import userIcon from '../img/usericon.png';
import logoy from "../img/logo.png";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: relative;
  color: ${({ theme }) => theme.text};
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`

  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
 
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Logo = styled.div`
display: none;

@media (max-width: 768px) {
  display: block;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px 25px;
}
`;

const Img = styled.img`
  height: 35px;
`;

const Navbar = () => {
   const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
   
    dispatch(logout());

    navigate("/signin");
  };

  const [logoVisible, setLogoVisible] = useState(true);

  const toggleLogo = () => {
    setLogoVisible(!logoVisible);
  }

  return (
    <>
      <Container>
        <Wrapper>
        <Logo>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="text-gray-400/70 font-bold text-2xl text-center">
            <Img src={logoy} />
            
          </div>
        </Link>
      </Logo>

          <Search>
            <Input 
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
             <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)}/>
          </Search>
        
          {currentUser ? (
            <User>
              <LogoutIcon style={{ cursor: 'pointer' }} onClick={handleLogout} />
              
              <VideoCallOutlinedIcon  style={{ cursor: 'pointer' }} onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img ? currentUser.img : userIcon} />
              {currentUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};
export default Navbar;
