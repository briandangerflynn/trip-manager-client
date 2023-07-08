import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { getSession, objectExists } from "./utils";
import Header from "./components/Header";
import Login from "./components/Login";
import Trips from "./components/Trips";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  let navigateTo = useNavigate();

  const checkForUserSession = () => {
    const session = getSession();
    if (objectExists(session)) {
      setCurrentUser(session);
      navigateTo("/");
    } else if (!objectExists(currentUser)) {
      navigateTo("/login");
    }
  };

  useEffect(() => {
    if (!objectExists(currentUser)) {
      checkForUserSession();
    }
  }, [currentUser]);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" exact element={<Trips currentUser={currentUser} />} />
        <Route
          path="/login"
          exact
          element={<Login setCurrentUser={setCurrentUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
