
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from './AuthProvider'
import { logout } from './firebase-config'

const UserProfile = () => {
  const [showOptions, setShowOptions] = useState(false)
  const { currentUser } = useAuth()
  const user = currentUser


  const handleLogout = async () => {
    try {
      await logout()
      console.log('User signed out')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }
  
  return (
    <div 
        id="profile-button" 
        style={user.photoURL && {backgroundImage: `url(${user.photoURL}`}} 
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
      <div id="profile-name">
        <strong>{user.displayName}</strong>
      </div>
      {showOptions && (
        <div id="account-dropdown" >
          {/* <div id="account-settings" class="account-button" onClick={() => console.log('Edit Account Settings')}>Edit Account</div> */}
          <button id="logout" class="account-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default UserProfile
