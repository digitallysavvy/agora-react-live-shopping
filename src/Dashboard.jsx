import React from 'react'
import Header from './Header'
import { Popover } from '@mui/material'
import ScheduleSessionForm from "./ScheduleSessionForm"

// Temp Dashboard placeholder using the default vite react page
function Dashboard () {
  const [visbile, setVisibile] = useState(false)

  const togglePopover = (event) => {
    setVisibile(!visbile)
  } 
  
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
      <Popover
        id='schedule-session-container'
        open={visbile}
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
        }}
      >
        <ScheduleSessionForm />
      </Popover>
    </>
  )
}

export default Dashboard