
import React from 'react'
import agoraLogo from './assets/agora-logo.svg'
import UserProfile from './UserProfile'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = ({ displayMenu = true}) => {
  const navigate = useNavigate()

  return (
    <header>
      <div
        onClick={ () => navigate('/') }
      >
        <img src={agoraLogo} className="logo" alt="Agora logo" />
      </div>
      <nav>
        {displayMenu && (
          <button
            variant='contained'
            onClick={ () => navigate('/schedule') }
          >
            Schedule Session
          </button>
        )}
      </nav>
      <UserProfile />
    </header>
  )
}

export default Header
