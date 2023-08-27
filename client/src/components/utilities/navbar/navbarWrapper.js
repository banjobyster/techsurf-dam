import * as React from "react";
import {
  Box,
  Typography,
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarMenu from "./navbarMenu";
import SearchBar from "../searchBar";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const drawerWidth = Math.min(240, screenWidth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            backgroundColor: "white",
          }}
        >
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: "8px", mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <SearchBar />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <NavbarMenu handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
            },
          }}
          open
        >
          <NavbarMenu />
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;