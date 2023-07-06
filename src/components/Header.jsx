import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { objectExists, API_ENDPOINT } from "../utils";

export default function Header({ currentUser, setCurrentUser }) {
  const handleLogout = async () => {
    await axios.delete(`${API_ENDPOINT}/sessions/${currentUser.id}`);
    sessionStorage.removeItem("user");
    setCurrentUser({});
  };

  const Button = () => {
    if (objectExists(currentUser)) {
      return <button onClick={handleLogout}>Logout</button>;
    } else {
      return null;
    }
  };

  return (
    <header>
      <h1>Trip Management App</h1>
      <Button />
    </header>
  );
}
