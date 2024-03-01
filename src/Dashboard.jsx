import React, { useState } from 'react'
import Header from './Header'
import { Popover } from '@mui/material'
import ScheduleSessionForm from "./ScheduleSessionForm"

// Temp Dashboard placeholder using the default vite react page
function Dashboard () {
  const [popoverIsVisbile, setPopoverIsVisbile] = useState(false)
  const [scheduledEvents, setScheduledEvents] = useState([])

  const togglePopover = (event) => {
    console.log(`toggle-popover with event: ${event}`)
    setPopoverIsVisbile(!popoverIsVisbile)
  } 

  const handleFormSubmit = (eventDetials) => {
    setScheduledEvents([...scheduledEvents, eventDetials])
    togglePopover()
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
      <div id='scheduled-events-container'>
        {scheduledEvents.map((eventDetails, index) => (
          <div key={index} className='card'>
            <h2>Live Session</h2>
            { console.log(eventDetails) }
            <p>Date: {eventDetails.date.toString()}</p>
            <p>Hosts: {eventDetails.cohosts.length++}</p>
            <p>Visibility: {eventDetails.visibility}</p>
          </div>
        ))}
      </div>
      {popoverIsVisbile && <div id='overlay' onClick={togglePopover}></div>}
      <Popover
        id='schedule-session-container'
        open={popoverIsVisbile}
        onClose={togglePopover}
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
          maxWidth: '750px',
          height: '550px'
        }}
      >
        <ScheduleSessionForm
          handlePassBackEvent={handleFormSubmit}
        />
      </Popover>
    </>
  )
}

export default Dashboard