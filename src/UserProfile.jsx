
import React, { useState } from 'react'
import { useAuth } from './AuthProvider'
import { logout } from './firebase-config'

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
            <button onClick={() => setShowOptions(!showOptions)}>{currentUser?.email.split("@")[0]}</button>
            {showOptions && (
                <div style={{ position: 'absolute', right: 20, color: '#000', background: '#fff', padding: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                    <button style={{display: 'block', padding: '10px'}} onClick={() => console.log('Edit Account Settings')}>Edit Account</button>
                    <button style={{display: 'block', padding: '10px'}} onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
