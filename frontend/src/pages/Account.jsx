import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import DatePicker from 'react-date-picker';
import { useState, useEffect } from "react";
import "./Account.css"
import FileBase64 from "react-file-base64"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
  const [name, setName] = useState('')
  const [nameCurrent, setNameCurrent] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [birthDate, setBirthDate] = useState(new Date());
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setName(user.name)
    setNameCurrent(user.name)
    setEmail(user.email)
    setBirthDate(user.birthDate)
    setPhoto(user.photo)
  }, []);

  const handleLogout = () => {
    AuthService.logout();
  }

  const handlePatch = (e) => {
    e.preventDefault();
    const id = currentUser._id
    if (password === confirmPassword) {
      if (name && email) {
        try {
          AuthService.patch(name, email, password, photo, id).then(
            (response) => {
              window.location.reload();
            },
            (error) => {
              console.log(error);
            }
          );
        } catch (err) {
          console.log(err);
        }
      } else {
        toast.error("Name and Email can not be Empty.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Both password should be the same.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }

  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Your account is deleting.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      AuthService.deleteUser(currentUser._id).then(
        (response) => {
        },
        (error) => {
          console.log(error);
        }
      );

    } catch (err) {
    }
    localStorage.removeItem("user");
    localStorage.removeItem("users");
    navigate("/login");
    window.location.reload();
  }

  return (
    < div className="account-main">
      <nav>
        <Link className="nav-link" to={"/people"}>People</Link>
        <a href="/login" className="logout" onClick={handleLogout}>
          Logout
        </a>
      </nav>

      <div className="main">
        <form className="account-form">
          <div>
            <aside>
              <img style={{ objectFit: "cover" }} src={photo} alt="" />
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
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="info-section">
                <div className="info">If you don't want to change the password don't type anything here.</div>
              </div>
            </div>
          </div>
          <div>
            <aside>Confirm Password</aside>
            <div className="div-form-right">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <aside>Birth Date</aside>
            <div className="div-form-right">
              <DatePicker onChange={setBirthDate} value={typeof value !== Date ? new Date(birthDate) : birthDate} />
            </div>
          </div>
          <div>
            <aside></aside>
            <div className="div-form-right btn-section">
              <button className="submit" onClick={handlePatch}>Change</button>
              <div>
                <button onClick={handleDelete} className="btn-secondary delete-account">Delete my account</button>
              </div>
            </div>
          </div>
        </form>
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
      </div>
    </ div >
  )
}

export default Account;
