import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const UserItem = ({ user, isOpen, toggleAccordion, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
  };

  const isAdult = calculateAge(user.dob) >= 18;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveChanges = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="user-item">
      <div className="user-header" onClick={!isEditing ? toggleAccordion : null}>
        <h3>{formData.first}</h3>
        <button>{isOpen ? "-" : "+"}</button>
      </div>

      {isOpen && (
        <div className="user-details">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.first}
                onChange={handleChange}
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                pattern="[A-Za-z ]+"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Transgender</option>
                <option>Rather not say</option>
                <option>Other</option>
              </select>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <div>
                <button onClick={saveChanges} disabled={!isAdult}>
                  <FaCheck />
                </button>
                <button onClick={() => setIsEditing(false)}>
                  <FaTimes />
                </button>
              </div>
            </>
          ) : (
            <>
              <p>Age: {calculateAge(user.dob)} Years</p>
              <p>Gender: {formData.gender}</p>
              <p>Country: {formData.country}</p>
              <p>Description: {formData.description}</p>
              {isAdult && (
                <div>
                  <button onClick={() => setIsEditing(true)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(user.id)}>
                    <FaTrash />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserItem;
