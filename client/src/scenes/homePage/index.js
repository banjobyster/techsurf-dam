import * as React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Navbar from "../../components/utilities/navbar/navbarWrapper";
import Workspace from "../../components/workspace";
import { useDispatch, useSelector } from "react-redux";
import { setFiles, setSearchParam } from "../../state";

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const updateFiles = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/workspace/get-files`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();
      if (!responseData.error) {
        dispatch(
          setFiles(responseData)
        );
      } else {
        alert(responseData.error);
      }
    }
    catch (err) {
      alert(err);
    }
  }

  React.useEffect(() => {
    updateFiles();
    dispatch(setSearchParam({ searchParam: null }));
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 0,
          width: { xs: "100%", sm: `calc(100% - 240px)` },
          height: "90vh",
        }}
      >
        <Toolbar />
        <Workspace />
      </Box>
    </Box>
  );
};

export default HomePage;


