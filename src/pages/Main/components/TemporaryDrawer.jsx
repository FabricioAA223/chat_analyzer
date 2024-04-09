import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HistoryIcon from '@mui/icons-material/History';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Outlet } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

export default function TemporaryDrawer() {
  const {currentUser} = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Home', 'New analysis', 'Analysis in progress', 'Analysis finished'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => {index == 0 && navigate('/') || index == 1 && navigate('/new_analysis') || index == 2 && navigate('/processing_analysis') || index == 3 && navigate('/analysis_finished')}}>
            <ListItemButton>
              <ListItemIcon>
                {index == 0 && <HomeIcon /> || index == 1 && <AddCircleOutlineIcon /> || index == 2 && <DownloadingIcon /> || index == 3 && <HistoryIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{display:{md:'none'}}}/>
        <ListItem key={'SignOut'} disablePadding onClick={() => {signOut(auth)}} sx={{display:{md:'none'}}}>
        <ListItemButton>
            <ListItemIcon>
            <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign out'} />
        </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontFamily={'fantasy'} fontSize={'35px'} component="div" sx={{ flexGrow: 1, cursor:'pointer' }} onClick={()=>{navigate('/')}}>
                Chat Analyzer
            </Typography>
            <Box sx={{display:{xs:'none', md:'flex'}}} gap={'25px'}>
              <Button variant='outlined' color="inherit" onClick={() => {signOut(auth)}}>Sign Out</Button>
              <Box display={'flex'} gap={'5px'} justifyContent={'center'} m={'auto'}><AccountCircleIcon /><Typography>{currentUser.displayName}</Typography></Box>
            </Box>
            </Toolbar>
        </AppBar>
        </Box>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    
        <Outlet />
    </>
  );
}