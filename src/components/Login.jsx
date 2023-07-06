import { useState } from "react";
import axios from "axios";
import { API_ENDPOINT, objectExists, storeSession } from "../utils";
import { useNavigate } from "react-router";

export default function Login({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  let navigateTo = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLogin = async () => {
    const resp = await axios.post(`${API_ENDPOINT}/sessions`, { email: email });
    const user = resp.data.user;
    if (objectExists(user)) {
      setCurrentUser(user);
      storeSession(user);
      setEmail("");
      navigateTo("/");
    } else {
      console.log("error: ", user);
    }
  };

  return (
    <div id="login">
      <h3>Login</h3>
      <input
        value={email}
        onChange={handleEmailChange}
        type="text"
        placeholder="email"
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}
