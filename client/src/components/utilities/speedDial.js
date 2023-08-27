import * as React from 'react';
import { setLogout } from '../../state';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LogoutIcon from '@mui/icons-material/Logout';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import { useNavigate } from 'react-router-dom';

const SpeedDialTooltipOpen = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    { 
        icon: <SyncLockIcon />, 
        name: 'Change Password',
        event: () => {
            navigate("/change-password");
        } 
    },
    { 
        icon: <LogoutIcon />, 
        name: 'Logout',
        event: () => {
            dispatch(setLogout());
            navigate("/signin");
        } 
    },
  ];

  return (
    <Box>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.event}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default SpeedDialTooltipOpen;