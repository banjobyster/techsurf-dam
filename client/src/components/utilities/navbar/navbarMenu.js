import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import { setLogout } from "../../../state";

const NavbarMenu = ({ handleDrawerToggle = null }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/signin");
  };

  const handlePasswordChange = () => {
    navigate("/change-password");
  }

  let initials = "JD";

  if (user.firstName && user.lastName) {
    const firstNameInitial = user.firstName.charAt(0).toUpperCase();
    const lastNameInitial = user.lastName.charAt(0).toUpperCase();
    initials = `${firstNameInitial}${lastNameInitial}`;
  }

  return (
    <Box>
      <Box display="flex" gap="4px" m="15px" flexDirection="column">
        <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
          {initials}
        </Avatar>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography component="p" variant="subtitle2" color="text.secondary">
            {user.firstName ? user.firstName + " " + user.lastName : "John Doe"}
          </Typography>
          <Typography component="p" variant="caption" color="text.secondary">
            {user.email ? user.email : "example@email.com"}
          </Typography>
        </Box>
      </Box>
      {handleDrawerToggle && (
        <IconButton
          onClick={handleDrawerToggle}
          size="small"
          sx={{
            position: "absolute",
            top: "16px",
            right: "16px",
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <MenuList>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
        <MenuItem onClick={handlePasswordChange}>
          <ListItemIcon>
            <SyncLockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change Password</ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default NavbarMenu;
