import { useState, useEffect } from "react";
import People from "./People";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "./Nav.css"

const PeopleList = ({ currentUser }) => {

    const [users, setUsers] = useState([]);
    // const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getAllPeople().then(
            (response) => {
                setUsers(response.data.filter(element => element._id !== currentUser._id));
                console.log("Users...");
                console.log(users);
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
        );
    }, []);

    const handleLogout = () => {
        AuthService.logout();
    }

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/account");
    }

    return (
        <div className="people">
            <nav>
                <a className="nav-link" onClick={handleClick}>Account</a>
                <a href="/login" className="logout" onClick={handleLogout}>
                    Logout
                </a>
            </nav>
            {/* <button onClick={handleClick}>button</button> */}
            <h1>Here You can find All Users</h1>
            {users.map((people) => <People people={people} key={people.id} />)}
        </div>
    )
}

export default PeopleList;
