import {useContext, useState} from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import { Form, Formik } from 'formik';
import InputControl from '@/components/Form/InputControl';
import axios from '@/utils/axios';
import { MessageContext } from '@/context/MessageContext';
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
} from "@mui/material";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://muuzo-frontend.vercel.app/">
        Muuzo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {
  const emptyObject = {
    email : '',
    password: ''
  }
  const [initialValues, setInitialValues] = useState(emptyObject)
  const {setMessage, setErrors, message, type} = useContext(MessageContext)
  const router = useRouter()
    setTimeout(()=>{
        setMessage('')
    }, 5000)

    const handleSubmit = async (values) => {
    console.log(values)
    await axios().post("login", values)
    .then(response => {
        if(response.data.status == 200){
            setCookie("token", response.data.token)
            setCookie("user", response.data.user)

            setMessage({
                type: 'success',
                message: 'Login Success'
            })
            setTimeout(()=> {
                router.push('/auth/doctors')
            }, 2000)
        } else {
            setMessage({
                type: 'info',
                message: 'Invalid credentials'
            })
            // setErrors(response.data.errors)
        }
    })
  }

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundImage: 'url(https://images.unsplash.com/photo-1522158637959-30385a09e0da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',

            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1, width: "60%" }}>
                {message && (
                    <Alert severity={message.type}>{message.message}</Alert>
                )}
                <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <InputControl
                        md={12}
                        label="Email Address"
                        name="email"
                        autoFocus
                    />
                    <InputControl
                        md={12}
                        name="password"
                        label="Password"
                        type="password"
                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary" />}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign In
                    </Button>
                </Form>
              </Formik>          

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {/*Forgot password?*/}
                  </Link>
                </Grid>
                <Grid item>

                  <Link href="#" variant="body2">
                    {/*{"Don't have an account? Sign Up"}*/}
                  </Link>
                </Grid>
              </Grid>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}
Login.guest = true