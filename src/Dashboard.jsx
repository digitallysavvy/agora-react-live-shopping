import React from 'react'
import Header from './Header'

// Temp Dashboard placeholder using the default vite react page
function Dashboard () {

  return (
    <>
      <Header />
      <h1>Live Shopping Sessions</h1>
      <div className="card">
        You don't have any sessions scheduled, let's change that.
      </div>
      <p className="read-the-docs">
        Use  the button above to schedule your first session.
      </p>
    </>
  )
}

export default Dashboard