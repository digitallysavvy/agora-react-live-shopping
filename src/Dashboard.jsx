import React from 'react'
import { logout } from './firebase-config'
import agoraLogo from './assets/agora-logo.svg'
import './App.css'

// Temp Dashboard placeholder using the default vite react page
function Dashboard () {

  return (
    <>
      <Header />
      <div>
        <a href="https://agora.io" target="_blank">
          <img src={agoraLogo} className="logo" alt="Agora logo" />
        </a>
      </div>
      <h1>Live Shopping</h1>
      <div className="card">
        <button onClick={() => logout() }>
          Sign out
        </button>
      </div>
      <p className="read-the-docs">
        You don't have any sessions scheduled, let's change that. <br/>
        Use  the button above to schedule your first session.
      </p>
    </>
  )
}

export default Dashboard