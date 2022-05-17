import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useState, useEffect } from "react";
import "./account.css"

const People = ({ currentUser }) => {
  const [name, setName] = useState('')
  const [nameCurrent, setNameCurrent] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState(new Date());
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();

  // setName(currentUser.name)

  useEffect(() => {
    setName(currentUser.name)
    setNameCurrent(currentUser.name)
    setEmail(currentUser.email)
    setBirthDate(currentUser.birthDate)
    setPhoto(currentUser.photo)
  }, []);

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/people");
  }

  const handleLogout = () => {
    AuthService.logout();
  }

  return (
    < div className="account-main">
      <nav>
        <a className="nav-link" onClick={handleNavigate}>People</a>
        <a href="/login" className="logout" onClick={handleLogout}>
          Logout
        </a>
      </nav>

      <div className="main">
        <form >
          <div>
            <aside>
              <img src="" alt="" />
            </aside>
            <div class="div-form-right">
              <h2>{nameCurrent}</h2>
              <div class="info-section">
                <button class="btn-secondary">Set a new Photo</button>
              </div>
            </div>
          </div>
          <div>
            <aside>Name</aside>
            <div class="div-form-right">
              <input type="text" name="" id="" value={name} onChange={e => setName(e.target.value)} />
              <div class="info-section">
                <div class="info">
                  Help people discover your account by using the name you're
                  known by: either your full name, nickname, or business name.
                </div>
              </div>
            </div>
          </div>
          <div>
            <aside>Email</aside>
            <div class="div-form-right">
              <input
                type="text"
                name=""
                id=""
                value={email} onChange={e => setEmail(e.target.value)}
              />
              <div class="info-section">
                <h2>Personal Information</h2>
                <div class="info">Provide your personal information, even if the account is used for a business, With email you can reset password.</div>
              </div>
            </div>
          </div>
          <div>
            <aside>Password</aside>
            <div class="div-form-right">
              <input
                type="password"
                name=""
                id=""
                placeholder="Set a New Password"
              />
              <div class="info-section">
                <div class="info">If you don't want to change the password don't type anything here.</div>
              </div>
            </div>
          </div>
          <div>
            <aside>Confirm Password</aside>
            <div class="div-form-right">
              <input
                type="password"
                name=""
                id=""
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div>
            <aside></aside>
            <div class="div-form-right btn-section">
              <button class="submit">Change</button>
              <div>
                <button class="btn-secondary delete-account">Delete my account</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ div >
  )
}

export default People;
