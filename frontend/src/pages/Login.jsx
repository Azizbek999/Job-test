import styled from "styled-components"
import { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(33, 31, 31, 0.5),
      rgba(33, 31, 31, 0.5)
    ),
    url("https://static1.bigstockphoto.com/8/6/3/large1500/368557969.jpg")
      center;
      background-repeat: no-repeat;
      background-size: auto 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  min-width: 320px;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  min-width: 320px;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill each input field!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      try {
        await AuthService.login(email, password).then(
          () => {
            navigate("/people");
            window.location.reload();
          },
          (error) => {
            toast.error('Wrong Email or Password!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            })
            console.log(error);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" onClick={handleLogin}>LOGIN</Button>
          {/* {error && <Error>Something went wrong...</Error>} */}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link href="/">CREATE A NEW ACCOUNT</Link>
        </Form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Wrapper>
    </Container>
  );
};

export default Login;