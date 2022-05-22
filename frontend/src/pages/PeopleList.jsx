import { useState, useEffect } from "react";
import People from "./People";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "./Nav.css"

const PeopleList = ({ currentUser }) => {

    const [users, setUsers] = useState([]);
    console.log(users);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(users);
        UserService.getAllPeople().then(
            (response) => {
                localStorage.setItem("users", JSON.stringify(response.data.filter(element => element._id !== currentUser._id)));
                setUsers(JSON.parse(localStorage.getItem("users")))
            },
            (error) => {
                console.log(".....", error.response);
                // Invalid token
                if (error.response && error.response.status === 403) {
                    AuthService.logout();
                    navigate("/login");
                    window.location.reload();
                }
            }
        )
    }, []);

    useEffect(() => {
        if (localStorage.getItem("users")) {
            setUsers(JSON.parse(localStorage.getItem("users")))
        }
    }, [])


    const handleLogout = () => {
        AuthService.logout();
    }

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/account");
    }

    const DoThis = () => {
        window.location.reload()
        console.log("dothis")
    }

    return (
        <div className="people">
            <nav>
                <a className="nav-link" onClick={handleClick}>Account</a>
                <a href="/login" className="logout" onClick={handleLogout}>
                    Logout
                </a>
            </nav>
            <h1>Here You can find All Users</h1>
            {users.length && users.map((people) => <People people={people} key={people._id} />)}
        </div>
    )
}

export default PeopleList;
