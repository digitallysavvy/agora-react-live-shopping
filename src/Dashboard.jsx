import { useState } from 'react'
import { logout } from './firebase-config'
import reactLogo from './assets/react.svg'
import agoraLogo from '/assets/agora-logo.svg'
import './App.css'

// Temp Dashboard placeholder using the default vite react page
function Dashboard () {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://agora.io" target="_blank">
          <img src={agoraLogo} className="logo" alt="Agora logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
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