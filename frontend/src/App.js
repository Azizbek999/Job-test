import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";
import PeopleList from "./pages/PeopleList";
import { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
    console.log(user);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Navigate to="/people" /> : <Register />}
        />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/people" /> : <Login />}
        />
        <Route
          path="/account"
          element={
            currentUser ? (
              <Account currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/people"
          element={
            currentUser ? (
              <PeopleList currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
