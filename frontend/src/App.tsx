import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Profile from "./pages/Profile";
import UserGuard from "./Guards/UserGuard";
import EditProfile from "./pages/EditProfile";
import { AuthContext } from "./context/AuthContext";
import SignUp from "./pages/Signup";
import Login from "./pages/login";
import "./App.css";
import { EDIT_PROFILE, HOME, LOGIN, REGISTER } from "./constants/routes";

function App() {
  const { isLoggedIn, reCheck } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path={HOME}
        element={
          <UserGuard isLoggedIn={isLoggedIn}>
            <Profile />
          </UserGuard>
        }
      />
      <Route
        path={LOGIN}
        element={
          isLoggedIn ? <Navigate to={HOME} /> : <Login reCheck={reCheck} />
        }
      />
      <Route
        path={REGISTER}
        element={
          isLoggedIn ? <Navigate to={HOME} /> : <SignUp reCheck={reCheck} />
        }
      />
      <Route
        path={EDIT_PROFILE}
        element={
          <UserGuard isLoggedIn={isLoggedIn}>
            <EditProfile />
          </UserGuard>
        }
      />
    </Routes>
  );
}

export default App;
