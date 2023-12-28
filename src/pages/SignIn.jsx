import axios from "axios";
import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { loginStart,loginFailure, loginSuccess } from "../redux/userSlice";
import styled ,{ createGlobalStyle }from "styled-components";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { RiLockPasswordLine, RiUserLine, RiMailLine } from "react-icons/ri";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: 'Arial', sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  color: #777;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  padding-left: 35px;
  background-color: #fff;
  width: 100%;
  color: #333;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const GoogleIcon = styled(FaGoogle)`
  font-size: 24px;
  margin-right: 10px;
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch =useDispatch();
  const navigate = useNavigate()
  
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axios.post("https://tubeverse-backend.onrender.com/api/auth/signin", { name, password },{
        withCredentials: true,
      });
      navigate('/');
      dispatch(loginSuccess(res.data));
    } catch (err) {
      window.alert("Wrong Credentials !")
      dispatch(loginFailure())
    }
  };

// changed
  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post('https://tubeverse-backend.onrender.com/api/auth/signup', { name, email, password },{
        withCredentials: true,
      });
      navigate('/');
      alert("User Registered ");
       // Redirect to login with success message
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("https://tubeverse-backend.onrender.com/api/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          },
          {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate("/")
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure());
      });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Wrapper>
          <Title>Sign in</Title>
          <SubTitle>to continue to TubeVerse</SubTitle>
          <InputWrapper>
            <InputIcon>
              <RiUserLine />
            </InputIcon>
            <Input
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <InputIcon>
              <RiLockPasswordLine />
            </InputIcon>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWrapper>
          <Button onClick={handleLogin}>Sign in</Button>
          <Title>or</Title>
          <Button onClick={signInWithGoogle}>
            <IconWrapper>
              <GoogleIcon />
              Sign in with Google
            </IconWrapper>
          </Button>
          <Title>or</Title>
          <InputWrapper>
            <InputIcon>
              <RiUserLine />
            </InputIcon>
            <Input
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <InputIcon>
              <RiMailLine />
            </InputIcon>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <InputIcon>
              <RiLockPasswordLine />
            </InputIcon>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWrapper>
          <Button onClick={handleSignup}>Sign up</Button>
        </Wrapper>
      </Container>
    </>
  );
};

export default SignIn;
