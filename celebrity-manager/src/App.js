import React from "react";
import UserList from "./components/UserList";
import "./styles.css";

function App() {
  return (
    <div className="app-container">
      <h1>Celebrity Manager</h1>
      <UserList />
    </div>
  );
}

export default App;
