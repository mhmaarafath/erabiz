import Router, { useRouter } from 'next/router';
import {useState, useContext, useEffect} from 'react';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/system';
import {
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Badge,
    Grid,
    Paper,
    Button,
    DialogContent,
    DialogContentText,
    DialogActions,
    Dialog,
    DialogTitle,
    Menu,
    Avatar,
    MenuItem,
    Alert, TextField, Snackbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { mainListItems, secondaryListItems, LinkItem } from '@/components/Menu';

import { AuthContext } from '@/context/AuthContext';
import { MessageContext } from '@/context/MessageContext';

import Backdrop from '@/components/Backdrop';
import { deleteCookie, getCookie } from 'cookies-next';
import axios from '../utils/axios';
import { ArrowBack } from '@mui/icons-material';
import DashboardIcon from "@mui/icons-material/Dashboard";
import * as React from "react";



const drawerWidth = 240;
export const Drawer = ({open, children}) => (
    <MuiDrawer
        variant="permanent"
        sx={(theme) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
                width: drawerWidth,
                overflow: 'hidden',
                transition: theme.transitions.create('width'),

                ...(!open && {
                    width: theme.spacing(8),

                }),
                [theme.breakpoints.down('sm')]: {
                    width: 0,
                    ...(!open && {
                        width: 240,
                    }),
                },
            }})
        }
    >
        {children}
    </MuiDrawer>
)

export const AppBar = ({open, children}) => (
    <MuiAppBar
        sx={
            (theme) => ({
                zIndex: theme.zIndex.drawer + 1,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create('width'),

                ...(!open && {
                    width: `calc(100% - ${theme.spacing(8)})`,
                }),

                [theme.breakpoints.down('sm')]: {
                    width: `calc(100%)`,

                    ...(!open && {
                        width: `calc(100% - ${drawerWidth}px)`,
                    }),
                },
            })
        }
    >
        {children}
    </MuiAppBar>
)

export default function AdminPanel({children, title}){
    const {setLoading, loading} = useContext(AuthContext)
    const {message, setMessage} = useContext(MessageContext)
    const loggedUser = getCookie('user') ? JSON.parse(getCookie('user')) : null
    const router = useRouter()

    const [anchorElUser, setAnchorElUser] = useState(false);

      const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
      };

    const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    };

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
    setOpen(!open);
    };

  const logout = async () => {
    setLoading(true)
    deleteCookie('token')
    deleteCookie('user')
    router.push('/login')   
  }
  
  return (
      <Box sx={{ display: 'flex' }}>

      <Drawer open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
            {/*<LinkItem icon={<DashboardIcon/>} path='dashboard' text='Muuzo'/>*/}
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

        <Divider />

        <List component="nav">
          {/*{mainListItems}*/}
          {/*<Divider sx={{ my: 1 }} />*/}
           {secondaryListItems}
        </List>

      </Drawer>

      <AppBar open={open}>
        <Toolbar>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
              {title}
          </Typography>

          {/*<IconButton color="inherit">*/}
          {/*  <Badge badgeContent={4} color="secondary">*/}
          {/*    <NotificationsIcon />*/}
          {/*  </Badge>*/}
          {/*</IconButton>*/}

          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
            <Avatar src={loggedUser?.avatar} alt={`${loggedUser?.first_name} ${loggedUser?.last_name}`} />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>

      <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: 3
      }}
      >
        <Toolbar />

        <Button onClick={() => Router.back()} startIcon={<ArrowBack/>}>
          Back
        </Button>



        <Snackbar
            open={message.message ? true : false}
            autoHideDuration={1800}
            onClose={()=>setMessage('')}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}
            message={message.message}
        >
            {/*<Alert severity={message.type}>{message.message}</Alert>*/}
        </Snackbar>



        <Grid container spacing={4} style={{marginTop: 4}}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {children}
            </Paper>
          </Grid>
        </Grid>
        <Backdrop loading={loading}/>
      </Box>
    </Box>

  )
}

