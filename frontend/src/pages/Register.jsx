import { useState } from "react";
import styled from "styled-components"
import DatePicker from 'react-date-picker';
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";
import FileBase64 from 'react-file-base64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://static1.bigstockphoto.com/8/6/3/large1500/368557969.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
margin-top: 80px;
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  margin: 0 !important;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 60%;
  margin: 10px 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Link = styled.a`
  display: block;
  margin: 5px 0px;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
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
    color: #a61d1d;
    cursor: not-allowed;
  }
`;

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !gender || !photo || !birthDate) {
      toast.error('Please fill each input field!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast.loading('Registering please wait!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      try {
        await AuthService.signup(name, email, password, gender, photo, birthDate).then(
          (response) => {
            // check for token and user already exists with 200
            //   console.log("Sign up successfully", response);
            navigate("/people");
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
  }

  return (
    < Container >
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form >
          <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
          <Input name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <div style={{ width: "100%", marginTop: "20px" }}>
            <input type="radio" name="gender" value="male" onChange={(e) => setGender("male")} /> Male
            <input style={{ marginLeft: "20px" }} type="radio" name="gender" value="female" onChange={(e) => setGender("female")} /> Female
          </div>
          <h3 style={{ color: "black" }}>Set Your Profile Picture</h3>
          <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
            <div style={{ flexShrink: 0, alignItems: "center" }}>
              <img style={{ objectFit: "cover", marginRight: "20px"}} src={photo ? photo : "https://avatars.mds.yandex.net/i?id=d230be33021eb46895399ad7c4569ead-4901575-images-thumbs&n=13"} alt="" />
            </div>
            {/* <Input type="file" accept="image/jpeg, image/png" onChange={(e) => setPhoto(e.target.value)} required /> */}
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setPhoto(base64)}
            />
          </div>
          <div style={{ width: "100%", marginTop: "20px" }}>
            <DatePicker onChange={setBirthDate} value={birthDate} />
          </div>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit" onClick={handleClick}>Sign up</Button>
          <Link href="/login">Login</Link>
        </Form>
      </Wrapper>
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
    </ Container >
  )
}

export default Register;
