import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useState, useEffect } from "react";
import "./account.css"
import FileBase64 from "react-file-base64"


const People = ({ currentUser }) => {
  const [idd, setId] = useState('')
  const [name, setName] = useState('')
  const [nameCurrent, setNameCurrent] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState(new Date());
  const [photo, setPhoto] = useState('');
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  // setName(currentUser.name)

  useEffect(() => {
    setId(currentUser._id)
    setName(currentUser.name)
    setNameCurrent(currentUser.name)
    setEmail(currentUser.email)
    setBirthDate(currentUser.birthDate)
    setPhoto(currentUser.photo)
  }, []);

  const handleNavigate = (e) => {
    console.log(name);
    e.preventDefault();
    navigate("/people");
  }

  const handleLogout = () => {
    AuthService.logout();
  }

  const handlePatch = async (e) => {
    setCount(count + 1);
    console.log(count);
    e.preventDefault();
    const id = currentUser._id
    console.log("this - -- - " + id);
    try {
      await AuthService.patch(name, email, password, photo, id).then(
        (response) => {
          // check for token and user already exists with 200
          // navigate("/people");
          // window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    < div className="account-main">
      <nav>
        <a className="nav-link" onClick={handleNavigate}>People</a>
        <a href="/login" className="logout" onClick={handleLogout}>
          Logout
        </a>
      </nav>

      <div className="main">
        <form>
          <div>
            <aside>
              <img src={photo} alt="" />
            </aside>
            <div className="div-form-right">
              <h2>{nameCurrent}</h2>
              <div className="info-section">
                <FileBase64
                  type="file"
                  name="photo"
                  multiple={false}
                  onDone={({ base64 }) => setPhoto(base64)}
                />
                {/* <button class="btn-secondary">Set a new Photo</button> */}
              </div>
            </div>
          </div>
          <div>
            <aside>Name</aside>
            <div className="div-form-right">
              <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
              <div className="info-section">
                <div className="info">
                  Help people discover your account by using the name you're
                  known by: either your full name, nickname, or business name.
                </div>
              </div>
            </div>
          </div>
          <div>
            <aside>Email</aside>
            <div className="div-form-right">
              <input
                type="text"
                name="email"
                value={email} onChange={e => setEmail(e.target.value)}
              />
              <div className="info-section">
                <h2>Personal Information</h2>
                <div className="info">Provide your personal information, even if the account is used for a business, With email you can reset password.</div>
              </div>
            </div>
          </div>
          <div>
            <aside>Password</aside>
            <div className="div-form-right">
              <input
                type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}
              />
              <div className="info-section">
                <div className="info">If you don't want to change the password don't type anything here.</div>
              </div>
            </div>
          </div>
          {/* <div>
            <aside>Confirm Password</aside>
            <div className="div-form-right">
              <input
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          </div> */}
          <div>
            <aside></aside>
            <div className="div-form-right btn-section">
              <button className="submit" onClick={handlePatch}>Change</button>
              <div>
                <button className="btn-secondary delete-account">Delete my account</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ div >
  )
}

export default People;
