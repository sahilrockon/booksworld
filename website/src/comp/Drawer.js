import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Popover from '@mui/material/Popover'; // Step 1: Import Popover
import {useNavigate} from 'react-router-dom';
import WelcomeMessage from './wlcm';
import Content from './content';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { context } from './context';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 150;


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '200%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100ch',
      
    },
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
 
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        backgroundColor: 'grey', // Add this line to set the background color
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        backgroundColor: 'grey', // Add this line to set the background color
      },
    }),
  }),
);
export default function MiniDrawer() {
  
  //this is main app data 
const {setdata,setGenre,setSearchByGenre,user,setByLiked,setUser,setEmaill,setPass,setLiked}=React.useContext(context);




  const handleKeyPress = (event) => {



    if (event.key === 'Enter') {
      // Call your method here when Enter key is pressed
      // Replace the alert with your desired method
    if(event.target.value==="")
    {
       alert("Empty!!!");
    }  
    else 
    {
      setByLiked(false);
      setdata(event.target.value);
      setSearchByGenre(false);
    }
  }
  };


  const navigate=useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isMouseOverIcon, setIsMouseOverIcon] = React.useState(false);


  const [loginOptionsAnchor, setLoginOptionsAnchor] = React.useState(null); // Step 2: State for anchor element
  const isLoginOptionsOpen = Boolean(loginOptionsAnchor);

  const [filterOptionsAnchor, setfilterOptionsAnchor] = React.useState(null); 
  const isfilterOptionsOpen = Boolean(filterOptionsAnchor);

  
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


  const closeFilterOption=()=>{
setfilterOptionsAnchor(null);
  }

  const openFilterOptioon=(event)=>{
    setfilterOptionsAnchor(event.currentTarget);
  }
  

  const handleOptionClick = (value) => {
    setSearchByGenre(true);
    setGenre(value);
    closeFilterOption();
    setByLiked(false);

  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>


        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
           
    
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          </Typography>

       
          <div style={{ flexGrow: 1 }}></div>
        
          <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search by Book / Author name "
        inputProps={{ 'aria-label': 'search' }}
        onKeyPress={handleKeyPress}
       // onChange={HandleChange}
      />
    </Search>

          <IconButton color="inherit" onClick={openLoginOptions}>
            <AccountCircleIcon />
            <Typography variant="body1" style={{ marginLeft: '4px', cursor: 'pointer'}}>
              {user}
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
                  <ListItemText primary="Already User" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('/login')}>
                  <ListItemText primary="New User" />
                </ListItemButton>

                {
                user!='LOGIN' &&(
                <ListItemButton>
                  <ListItemText primary="Logout" onClick ={()=>{
                  setUser('LOGIN');
                  setPass('');
                  setEmaill('');
                  setLiked([]);
                     
                  }} />
                </ListItemButton>) }

              </List>
            </Box>
          </Popover>
        </Toolbar>
      </AppBar>
      
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

        <ListItem key="home" disablePadding sx={{ display: 'block' }} onClick={()=>{setByLiked(false)}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:'white'
                }}
              >
                <Tooltip title="Home" placement='right'   sx={{
                    fontSize: '10vw'
                  }}>
                  {/* Add your ListItemIcon here */}
                  <ListItemIcon        sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
               <HomeIcon sx={{color:'white'}}/>
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
               </ListItem>



        <IconButton
      color="inherit"
      onClick={openFilterOptioon}
      onMouseEnter={() => setIsMouseOverIcon(true)}
      onMouseLeave={() => setIsMouseOverIcon(false)}
      sx={{
        minHeight: 48,
        px: 2.5,
        color: 'white',
      }}
    >
      <Tooltip
        title={!open && isMouseOverIcon ? 'Filter' : ''}
        placement="right"
        arrow
        open={!open && isMouseOverIcon}
        disableHoverListener={open}
        sx={{
          fontSize: '10vw',
        }}
      >
        <span>
          <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <AccountCircleIcon /> {/* Always display the AccountCircleIcon */}
            {open &&  <span style={{ marginLeft: '22px' }}>Filter</span>} 
          </Typography>
        </span>
      </Tooltip>
    </IconButton>

          {/* Step 5: Set anchor element for login options popover */}
          <Popover
            open={isfilterOptionsOpen}
            anchorEl={filterOptionsAnchor}
            onClose={closeFilterOption}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
        


            <Box sx={{ p: 4 }}>
              <List>
                {/* Button to set 'data' to 'Romance' */}
                <ListItemButton
                  onClick={() => handleOptionClick('Romance')}
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:not(:last-child)': {
                      marginBottom: 2, // Add margin bottom for separation
                    },
                    '&:hover': {
                      backgroundColor: 'blue', // Change background color on hover
                    },
                  }}
                >
                  <ListItemText primary="Romance" />
                </ListItemButton>
                {/* Button to set 'data' to 'Fantasy' */}
                <ListItemButton
                  onClick={() => handleOptionClick('Fantasy')}
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:not(:last-child)': {
                      marginBottom: 2, // Add margin bottom for separation
                    },
                    '&:hover': {
                      backgroundColor: 'blue', // Change background color on hover
                    },
                  }}
                >
                  <ListItemText primary="Fantasy" />
                </ListItemButton>
                {/* Button to set 'data' to 'Horror' */}
                <ListItemButton
                  onClick={() => handleOptionClick('Horror')}
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:not(:last-child)': {
                      marginBottom: 2, // Add margin bottom for separation
                    },
                    '&:hover': {
                      backgroundColor: 'blue', // Change background color on hover
                    },
                  }}
                >
                  <ListItemText primary="Horror" />
                </ListItemButton>
                {/* Button to set 'data' to 'Thriller' */}
                <ListItemButton
                  onClick={() => handleOptionClick('Thriller')}
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:not(:last-child)': {
                      marginBottom: 2, // Add margin bottom for separation
                    },
                    '&:hover': {
                      backgroundColor: 'blue', // Change background color on hover
                    },
                  }}
                >
                  <ListItemText primary="Thriller" />
                </ListItemButton>
              </List>
            </Box>
          </Popover>

             <ListItem key="Liked" disablePadding sx={{ display: 'block' }} onClick={()=>{setByLiked(true)}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:'white'
                }}
              >
                <Tooltip title="Liked" placement='right'   sx={{
                    fontSize: '10vw'
                  }}>
                  {/* Add your ListItemIcon here */}
                  <ListItemIcon        sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
               <FavoriteIcon sx={{color:'red'}}/>
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Liked" sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
               </ListItem>
          
        </List>
        <Divider />
 
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <WelcomeMessage></WelcomeMessage>
     <Content></Content>
      </Box>
    </Box>
  );
}
