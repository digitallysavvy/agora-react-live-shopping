
import React from 'react'
import agoraLogo from './assets/agora-logo.svg'
import UserProfile from './UserProfile'

const Header = ({ displayMenu = true}) => {
  return (
    <header>
      <img src={agoraLogo} className="logo" alt="Agora logo" />
      <nav>
        {displayMenu && (
          <button>Schedule Session</button>
        )}
      </nav>
      <UserProfile />
    </header>
  )
}

export default Header
