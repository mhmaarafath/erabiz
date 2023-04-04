import {forwardRef, useContext, useEffect, useState} from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import { Form, Formik } from 'formik';
import InputControl from '@/components/Form/InputControl';
import axios from '@/utils/axios';
import MessageContextProvider, { MessageContext } from '@/context/MessageContext';
import { TransitionProps } from '@mui/material/transitions';

import {
    Alert,
    Avatar,
    Button,
    CssBaseline,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    TextField,
    Autocomplete,
    Modal,
    Slide,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import FormGrid from '@/components/Form/FormGrid';
import { Padding } from '@mui/icons-material';





const Doctor = ({doctor, onClick}) => {
  return (
    <Box item
      onClick={onClick}
      sx={{
        display: 'flex',
        padding: 2,
        borderBottom: '1px solid',
        borderLeft: '1px solid',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        "&:hover": {
          backgroundColor: 'lightblue',
          cursor: 'pointer',
          columnSpan: 2,
        },
      }} 
    >
      <Avatar src={doctor.avatar} sx={{ m: 1, width:'40%', height: 'auto'}} />
      <Typography variant="h6">{doctor.name}</Typography>
      <Typography variant="p">{doctor.speciality.name}</Typography>
    </Box>

  )
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export default function Home() {
  const [search, setSearch] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [doctor, setDoctor] = useState([])
  const [specialities, setSpecialities] = useState([])

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [countryId, setCountryId] = useState(null)

  const [doctorId, setDoctorId] = useState(null)
  const [scheduleId, setScheduleId] = useState(null)
  const [appointment, setAppointment] = useState(null)

  const {setMessage, setErrors, message, type} = useContext(MessageContext)

  const asyncSearch = async() => {
    const result = await axios().post('public/doctors', search)
    setDoctors(result.data.data)
  }

  const asyncCountry = async (term) => {
    if(term){
      const response =  await axios().get(`public/countries/${term}`)
      setCountries(response.data.results)  
    }
  }

  const asyncSpecialities = async () => {
    const response =  await axios().get(`specialities`)
    setSpecialities(response.data.specialities)
  }

  const asyncSchedule = async () => {
    const response =  await axios().get(`public/doctors/${doctorId}`)
    setDoctor(response.data.data)
    console.log(response.data.data)
  }

  const onInputChange = (e, value) => {
    asyncCountry(value)
  }


  useEffect(()=>{
    asyncSearch()
  }, [search])

  useEffect(()=>{
    asyncSchedule()
  }, [doctorId])


  useEffect(()=>{
    asyncSpecialities()
  }, [])

  const defaultValue = {id: null,name: ''}

  const onChangeCountry = (e,value) => {
    if(value){
      setCountryId(value.id)
      setStates(value.states)
    } else {
      setStates([{id:null, name: null}])
    }
  }

  const isOptionEqualToValue = (option, value) => option.id == value.id

  const getOptionLabel = option => `${option['title'] || option['name']}`


  const handleSubmit = async (values)=>{
    values = {
      ...values,
      schedule_id: scheduleId
    }

    await axios().post('appointments', values).then(response => {
      console.log(response)
      if(response.data.status == 200){
        setAppointment(response.data.data)
    } else {
        setErrors(response.data.errors)
    }

    }).catch(e => console.log('error', e))

  }

  const closeAppointment = () => {
    setAppointment(null)
    closeSheduleId()
  }

  const closeSheduleId = () => {
    setScheduleId(null)
    setErrors(null)
  }




  return (
        <>
          <Box sx={{display:'flex', justifyContent: 'right', padding: 2}}>
            <Link href='/auth/appointments'><Typography sx={{backgroundColor: 'black', color: 'white', padding: 2, textDecoration: 'none'}}>Adming Panel</Typography></Link>
          </Box>

          <Box sx={{display:'flex', gap: 2, marginY: 2, flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h4'>Search Doctor, Make an Appointment</Typography>
            <Typography variant='h6'>Discover the best doctors, clinic & hospital the city nearest to you</Typography>
          </Box>
        
          <Box sx={{borderTop:'1px solid'}}>
            <Box sx={{display: 'grid', gridTemplateColumns: 'auto auto'}}>
              <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',  
                    marginTop: 5,          
                  }}>
                <Box 
                  sx={{width: '50%'}}
                >
                    <TextField
                      size="small"
                      margin='dense'
                      fullWidth
                      label='Search'
                      onChange={(e) => setSearch({...search, search: e.target.value})}
                    />
                    <Autocomplete
                    fullWidth
                        size="small"
                        options={countries}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        onChange={onChangeCountry}
                        onInputChange={onInputChange}
                        defaultValue={defaultValue}
                        renderInput={(params) => (
                            <TextField
                                margin="dense"
                                {...params}
                                label='Country'
                            />
                        )}
                    />
                                    
                    <Autocomplete
                        fullWidth
                        disabled = {!countryId}
                        size="small"
                        options={states}                    
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        defaultValue={defaultValue}
                        onChange={(e, value) => {
                          setSearch({...search, state_id: value})
                        }}
                        renderInput={(params) => (
                            <TextField
                                margin="dense"
                                {...params}
                                label='State'
                            />
                        )}
                    />

                    <Autocomplete
                      multiple
                      fullWidth
                      size='small'
                      options={specialities}
                      disableCloseOnSelect
                      getOptionLabel={getOptionLabel}
                      onChange={(e, value) => {
                        setSearch({...search, specialities: value.map(item => item.id)})
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            name={option.name}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField margin="dense" {...params} label="Specialities"/>
                      )}
                    />
                </Box>
              </Box>

              <Box>
                <Box sx={{display: 'grid', gridTemplateColumns: 'auto auto auto'}}>
                    {
                    doctors && doctors.map(doctor => 
                      <Doctor 
                        onClick={()=> setDoctorId(doctor.id)} key={doctor.id} doctor={doctor}/>
                    )}
                </Box>
              </Box>

            </Box>
          </Box>
          



          <Dialog
            fullScreen
            open={doctorId}
            onClose={()=>setDoctorId(null)}
          >
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={()=>setDoctorId(null)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  {doctor?.name}
                </Typography>
              </Toolbar>
            </AppBar>
            <List>
              {doctor && doctor.schedules && doctor.schedules.map(schedule => (
                  <>
                    <ListItem sx={{cursor: 'pointer'}} onClick={()=>setScheduleId(schedule.id)}>
                      <ListItemText primary={`${schedule.hospital.name} - ${schedule.hospital.state.name}`} secondary={`${schedule.day} - ${schedule.start} - ${schedule.end}`} />
                    </ListItem>
                    <Divider />
                  </>
              ))}
            </List>
          </Dialog>


          <Dialog open={!!scheduleId} onClose={closeSheduleId}>
            <Formik enableReinitialize={true} initialValues={{}} onSubmit={handleSubmit}>
                {
                    formik => {
                        // console.log('Props', formik)
                        return (
                            <Form>
                                <DialogTitle>Make an Appointment</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <Grid container spacing={2}>
                                          <FormGrid md={12} type='date' name='date' label='Date *'/>
                                          <FormGrid md={12} type='text' name='name' label='Name *'/>
                                          <FormGrid md={12} type='text' name='phone' label='Phone *'/>
                                        </Grid>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeSheduleId}>Cancel</Button>
                                    <Button disabled={formik.isSubmitting} type='submit'>Save</Button>
                                </DialogActions>
                            </Form>
                        )
                    }
                }
            </Formik>
          </Dialog>


          <Dialog
            open={!!appointment}
            onClose={closeAppointment}
          >
            <DialogTitle>
              Appointment Made Successfully
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Appointment Number: {appointment?.number}
                <br />
                Estimated Time: {appointment?.time}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeAppointment}>Close</Button>
            </DialogActions>
          </Dialog>



        </>

    
  )
}


Home.guest = true