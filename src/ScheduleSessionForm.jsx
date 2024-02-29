import { Chip, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, Switch, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import TimePicker from "react-time-picker"
import TimezoneSelect from "react-timezone-select"

const ScheduleSessionForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(getCurrentTime())
  const [selectedTimezone, setSelectedTimezone] = useState({ value: Intl.DateTimeFormat().resolvedOptions().timeZone })
  const [numberOfHosts, setNumberOfHosts] = useState(1)
  const [users, setUsers] = useState([])
  const [selectedCohosts, setselectedCohosts] = useState([])
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [isPrivate, setIsPrivate] = useState(false)
  const [privatePasscode, setPrivatePasscode] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      if (numberOfHosts > 1) {
        // TODO: Create function to getUsers() from firstore
        // const fetchedUsers =  await getUsers() // getUsers from FB Firestore
        const fetchedUsers = [] // Empty array of users
        setUsers(fetchedUsers)
      }

    }
    fetchUsers() // Get list of users for cohost
  }, [numberOfHosts])

  const handleSubmit = async(e) => {
    e.preventDefault()

    const sessionDetails = {
      date: selectedDate,
      time: selectedTime,
      timeZone: selectedTimezone.value,
      cohosts: selectedCohosts,
      products: selectedProducts,
      visibility: isPrivate ? 'Private' : 'Public',
      privatePasscode: isPrivate ? privatePasscode : null
    }
    // TODO: Create function to store sessionDetails in firestore
    // await scheduleSession(sessionDetails)
  }

  const handleCohostSelect = (event) => {
    const { target: {value} } = event
    setselectedCohosts(typeof value === 'string' ? value.split(',') : value)
  }

  // load the current time as the defualt value for the time picker
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,'0')
    const min = now.getMinutes().toString().padStart(2,'0')
    return `${hours}:${min}`
  }

  return(
    <form onSubmit={handleSubmit}>
      <DatePicker selected={selectedDate} onChange={ date => setSelectedDate(date) } />
      <TimePicker value={selectedTime} onChange={setSelectedTime} />
      <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />
      <TextField 
        type='number'
        label='Number of Hosts'
        value={numberOfHosts}
        onChange={ e => setNumberOfHosts(e.target.value) }
        inputProps={{ min: 1, max: 16 }}
      />
      {/* show the input for cohosts */}
      {numberOfHosts > 1 && (
        <FormControl fullWidth>
          <InputLabel id="cohosts-label">Cohosts:</InputLabel>
          <Select
            labelId="cohosts-label"
            id="cohosts-select"
            multiple
            value={selectedCohosts}
            onChange={handleCohostSelect}
            input={<OutlinedInput id="cohosts-select-multi-chip" label="Cohosts" />}
            renderValue={(selected) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                { selected.map(value => <Chip key={value} label={value}/>) }
              </div>
            )}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.name}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {/* TODO: Add Product Selection */}
      <FormControlLabel
        control={ <Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} /> }
        label='Private Event'
      />
      {isPrivate && (
        <TextField
          label='Private Passcode'
          type='password'
          value={privatePasscode}
          onChange={ e => setPrivatePasscode(e.target.value) }
        />
      )}
      <button type='submit'>Schedule</button>
    </form>
  )
}

export default ScheduleSessionForm