// src/components/UserProfile.jsx
import React, { useState } from 'react';
import { useAuth } from '../AuthProvider'; // Adjust the path based on your file structure
import { logout } from '../firebase-config'; // Adjust the path based on your file structure

const UserProfile = () => {
    const [showOptions, setShowOptions] = useState(false);
    const { currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            console.log('User signed out');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <div>
            <button onClick={() => setShowOptions(!showOptions)}>Profile</button>
            {showOptions && (
                <div style={{ position: 'absolute', right: 20, background: '#fff', padding: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                    <p>{currentUser?.email}</p>
                    <button onClick={() => console.log('Edit Account Settings')}>Edit Account</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
