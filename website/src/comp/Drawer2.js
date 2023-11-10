import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover'; // Step 1: Import Popover
import {useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';



const drawerWidth = 240;




const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


export default function MiniDrawer2(props ) {

 
   const navigate=useNavigate();
  const [open, setOpen] = React.useState(false);
  const [loginOptionsAnchor, setLoginOptionsAnchor] = React.useState(null); // Step 2: State for anchor element
  const isLoginOptionsOpen = Boolean(loginOptionsAnchor);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Step 3: Function to open login options popover
  const openLoginOptions = (event) => {
    setLoginOptionsAnchor(event.currentTarget);
  };

  // Function to close login options popover
  const closeLoginOptions = () => {
    setLoginOptionsAnchor(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>


        <Toolbar>

            <h1 style={{marginLeft:'40vw'}}>{props.name}</h1>
      
          <Typography variant="h6" noWrap component="div">
          </Typography>

       
          <div style={{ flexGrow: 1 }}></div>


          <IconButton color="inherit" onClick={() => navigate('/')} style={{position:'fixed',left:'0px'}}>
            <HomeIcon />
          </IconButton>

          <IconButton color="inherit" onClick={openLoginOptions}>
            <AccountCircleIcon />
            <Typography variant="body1" style={{ marginLeft: '4px', cursor: 'pointer'}}>
               Login
            </Typography>
 

          </IconButton>
          {/* Step 5: Set anchor element for login options popover */}
          <Popover
            open={isLoginOptionsOpen}
            anchorEl={loginOptionsAnchor}
            onClose={closeLoginOptions}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
        



            <Box sx={{ p: 2 }}>

              <List>
                <ListItemButton onClick={() => navigate('/Signin')}>
                  <ListItemText primary="Sign in" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('/login')}>
                  <ListItemText primary="Sign up" />
                </ListItemButton>
                <ListItemButton onClick={() => console.log('Option 3')}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </List>
            </Box>
          </Popover>
        </Toolbar>
      </AppBar>
   
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
    
      </Box>
    </Box>
  );
}
