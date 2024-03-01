import React, { useState } from 'react'
import Header from './Header'
import { Popover } from '@mui/material'
import ScheduleSessionForm from "./ScheduleSessionForm"

// Temp Dashboard placeholder using the default vite react page
function Dashboard () {
  const [popoverIsVisbile, setPopoverIsVisbile] = useState(false)

  const togglePopover = (event) => {
    console.log(`toggle-popover with event: ${event}`)
    setPopoverIsVisbile(!popoverIsVisbile)
  } 
  
  return (
    <>
      <Header 
        handleShowForm={togglePopover}
      />
      <h1>Live Shopping Sessions</h1>
      <div className="card">
        You don't have any sessions scheduled, let's change that.
      </div>
      <p className="read-the-docs">
        Use  the button above to schedule your first session.
      </p>
      {popoverIsVisbile && <div id='overlay' onClick={togglePopover}></div>}
      <Popover
        id='schedule-session-container'
        open={popoverIsVisbile}
        onClose={{togglePopover}}
        anchorReference='none'
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75vw',
          minWidth: '500px',
          maxWidth: '750px'
        }}
      >
        <ScheduleSessionForm />
      </Popover>
    </>
  )
}

export default Dashboard