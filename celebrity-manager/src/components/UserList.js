import React, { useState, useEffect } from "react";
import UserItem from "./UserItems";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null); 

  useEffect(() => {
    fetch("/celebrities.json")
      .then((res) =>
       
        res.json())
      .then((data) =>
        setUsers(data)).catch((err) =>console.log(err))
        
  }, []);

  const toggleAccordion = (id) => {
    if (activeUserId === id) {
      setActiveUserId(null);
    } else {
      setActiveUserId(id);
    }
  };

  const deleteUser = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete?");
    if (confirmation) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          isOpen={activeUserId === user.id}
          toggleAccordion={() => toggleAccordion(user.id)}
          onDelete={deleteUser}
          onUpdate={updateUser}
        />
      ))}
    </div>
  );
};

export default UserList;
