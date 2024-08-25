// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import { createUser, listUsers, getUserDetails, updateUser, deleteUser } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    uid: '',
    given_name: '',
    middle_name: '',
    family_name: '',
    nickname: '',
    email: '',
    phone_number: '',
    comment: '',
    directory: ''
  });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await listUsers();
    setUsers(response.data);
  };

  const handleCreateUser = async () => {
    await createUser(formData);
    fetchUsers();
    resetForm();
  };

  const handleUpdateUser = async () => {
    await updateUser(selectedUser.id, formData);
    fetchUsers();
    resetForm();
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    fetchUsers();
    if (selectedUser && selectedUser.id === userId) {
      resetForm();
    }
  };

  const handleSelectUser = async (userId) => {
    const response = await getUserDetails(userId);
    setSelectedUser(response.data);
    setFormData(response.data);
  };

  const resetForm = () => {
    setFormData({
      uid: '',
      given_name: '',
      middle_name: '',
      family_name: '',
      nickname: '',
      email: '',
      phone_number: '',
      comment: '',
      directory: ''
    });
    setSelectedUser(null);
  };

  return (
    <div>
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="UID"
        value={formData.uid}
        onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
      />
      <input
        type="text"
        placeholder="Given Name"
        value={formData.given_name}
        onChange={(e) => setFormData({ ...formData, given_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Middle Name"
        value={formData.middle_name}
        onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Family Name"
        value={formData.family_name}
        onChange={(e) => setFormData({ ...formData, family_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nickname"
        value={formData.nickname}
        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
      />
      <input
        type="text"
        placeholder="Comment"
        value={formData.comment}
        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
      />
      <input
        type="text"
        placeholder="Directory"
        value={formData.directory}
        onChange={(e) => setFormData({ ...formData, directory: e.target.value })}
      />

      <button onClick={selectedUser ? handleUpdateUser : handleCreateUser}>
        {selectedUser ? 'Update User' : 'Create User'}
      </button>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {`${user.given_name} ${user.family_name}`} - {user.email}
            <button onClick={() => handleSelectUser(user.id)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
