
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
        <div id="profile-container">
            <div id="profile-button" onClick={() => setShowOptions(!showOptions)}>
                {currentUser?.email.split("@")[0]}
            </div>
            {showOptions && (
                <div id="account-button-container" >
                    <button class="account-button" onClick={() => console.log('Edit Account Settings')}>Edit Account</button>
                    <button class="account-button" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
