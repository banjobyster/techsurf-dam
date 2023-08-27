import * as React from "react";
import {
  Backdrop,
  Box,
  Breadcrumbs,
  CircularProgress,
  CssBaseline,
  Paper,
  Typography,
  Link
} from "@mui/material";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import MetaDataSpace from "../../components/canvas/metaDataSpace";
import ImageSpace from "../../components/canvas/imageSpace";
import ImageToolbar from "../../components/canvas/imageToolbar";

const Canvas = () => {
  const isMobileDisplay = useMediaQuery("(min-width:600px)");
  const token = useSelector((state) => state.token);
  const [file, setFile] = React.useState(null);
  const [editedFile, setEditedFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { fileID } = useParams();
  const [imageData, setImageData] = React.useState(null);
  const [isCropping, setIsCropping] = React.useState(false);
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    const getFile = async () => {
      setLoading(true);
      const urlSearchParams = new URLSearchParams(window.location.search);
      const isOptimized = urlSearchParams.get("isOptimized") === "true";
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/workspace/get-file/${fileID}?isOptimized=${isOptimized}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();

        if (!responseData.error) {
          setFile(responseData.file);
          setEditedFile(responseData.file);
          setImageData(responseData.file.reference);
        } else {
          alert(responseData.error);
        }
      } catch (err) {
        alert(err);
      }
      setLoading(false);
    };

    getFile();
  }, []);

  const saveData = async () => {
    if (_.isEqual(editedFile, file)) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/workspace/update-file`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({ file: editedFile }),
        }
      );

      const responseData = await response.json();

      if (!responseData.error) {
        setFile(editedFile);
      } else {
        alert(responseData.error);
      }
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        padding: "24px",
        backgroundColor: "#f7f9fc",
      }}
    >
      {editedFile && (
        <>
          <Paper>
            <Breadcrumbs aria-label="breadcrumb" p="10px">
              <Link underline="hover" color="text.secondary" href="/">
                Home
              </Link>
              <Typography color="text.secondary">{fileID}</Typography>
            </Breadcrumbs>
            <MetaDataSpace
              editedFile={editedFile}
              isEdited={_.isEqual(editedFile, file)}
              setEditedFile={setEditedFile}
              saveData={saveData}
              imgRef={imgRef}
            />
          </Paper>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobileDisplay ? "row" : "column",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <Box
              sx={{
                flex: 1,
                position: "relative",
                minHeight: "200px",
                overflow: "scroll",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <ImageSpace
                editedFile={editedFile}
                setEditedFile={setEditedFile}
                imageData={imageData}
                setImageData={setImageData}
                isCropping={isCropping}
                imgRef={imgRef}
              />
            </Box>
            <Paper sx={{ width: isMobileDisplay ? "180px" : "100%" }}>
              <ImageToolbar
                editedFile={editedFile}
                setEditedFile={setEditedFile}
                isCropping={isCropping}
                setIsCropping={setIsCropping}
              />
            </Paper>
          </Box>
        </>
      )}
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
};

export default Canvas;
