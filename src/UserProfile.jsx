
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from './AuthProvider'
import { logout } from './firebase-config'

const UserProfile = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { currentUser } = useAuth();
  const accountRef = useRef(null)

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User signed out');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleOptions = () => {
    setShowOptions(previousShowOptions => !previousShowOptions)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(accountRef.current && !accountRef.current.contains(event.target)){
        setShowOptions(false) // Hide the options if users click outside this component
      }
    }
    // add mouse click listener 
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [accountRef])

  return (
    <div id="account-container" ref={accountRef}>
      <div id="profile-button" onClick={() => setShowOptions(!showOptions)}>
        {currentUser?.email.split("@")[0]}
      </div>
      {showOptions && (
        <div id="account-dropdown" >
          <div id="account-settings" class="account-button" onClick={() => console.log('Edit Account Settings')}>Edit Account</div>
          <button class="account-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
