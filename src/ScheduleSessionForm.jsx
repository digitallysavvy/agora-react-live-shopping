import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import DatePicker from "react-datepicker"
import TimePicker from "react-time-picker"
import TimezoneSelect from "react-timezone-select"
import { Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Switch, TextField } from "@mui/material"
import 'react-datepicker/dist/react-datepicker.css'

// Styles
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 75vw;
  min-width: 500px;
  max-width: 750px;
  margin: 0 auto;
`

const FormElement = styled.div`
  margin: 0 0 25px;
`

const Label = styled.label`
  color: #fff;
`

const TimePickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const TimePickerContainer = styled.div`
  margin: 0 25px 0 0;
`

const TimePickerButton = styled.button`
  background-color: rgba(255,255,255,0.25);
  border: 1px solid #099DFD;

  &:hover {
    background-color: #099DFD;
    border: 1px solid #000;
  }
`

const InputGroupInput = styled.input`
  width: auto;
  color: #fff;
`

// Form

const ScheduleSessionForm = () => {


  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('12:00')
  const [selectedTimezone, setSelectedTimezone] = useState({ value: Intl.DateTimeFormat().resolvedOptions().timeZone })
  const [numberOfHosts, setNumberOfHosts] = useState(1)
  const [users, setUsers] = useState([])
  const [selectedCohosts, setselectedCohosts] = useState([])
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [isPrivate, setIsPrivate] = useState(false)
  const [privatePasscode, setPrivatePasscode] = useState('')

  useEffect(() => {
    // load the current time as the initial value for the time picker
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,'0')
    const min = now.getMinutes().toString().padStart(2,'0') 
    setSelectedTime(`${hours}:${min}`)
  }, [])
  
  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      if (numberOfHosts > 1 && users.length == 0) {
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


  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormElement>
        <Label>Select Date</Label>
        <TextField 
          variant='outlined'
          InputProps={{
            inputComponent: ({ inputRef, ...props}) => {
              return (
                <DatePicker 
                  selected={selectedDate} 
                  onChange={ date => setSelectedDate(date) } 
                  customInput={<input ref={inputRef} {...props} />}
                  dateFormat="MMMM d, yyyy"
                />
              );
            }
          }}
        />
      </FormElement>
      <FormElement>
        <TimePickerWrapper>
          <TimePickerContainer>
            <Label>Select Time</Label>
            <TimePicker value={selectedTime} onChange={setSelectedTime} />
          </TimePickerContainer>
          <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />
        </TimePickerWrapper>
      </FormElement>
      <FormElement>
        <TextField 
          type='number'
          label='Number of Hosts'
          value={numberOfHosts}
          onChange={ e => setNumberOfHosts(e.target.value) }
          inputProps={{ min: 1, max: 16 }}
          variant='outlined'
        />
      </FormElement>
      {numberOfHosts > 1 && (
        <FormElement>
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
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
        </FormElement>
      )}
      <FormElement>
        <FormControlLabel
          control={ <Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} /> }
          label='Private Event'
        />
      </FormElement>
      {isPrivate && (
        <FormElement>
          <TextField
            label='Private Passcode'
            type='password'
            value={privatePasscode}
            onChange={ e => setPrivatePasscode(e.target.value) }
            variant='outlined'
          />
        </FormElement>
      )}
      <FormElement>
        <button type='submit'>Schedule</button>
      </FormElement>
    </FormContainer>
  )
}

export default ScheduleSessionForm