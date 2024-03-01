
import React from 'react'
import agoraLogo from './assets/agora-logo.svg'
import UserProfile from './UserProfile'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Header = ({ handleShowForm, displayMenu = true}) => {
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
          <Button variant='contained' onClick={ handleShowForm }>
            Schedule Session
          </Button>
        )}
      </nav>
      <UserProfile />
    </header>
  )
}

export default Header
