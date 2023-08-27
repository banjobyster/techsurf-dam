import React, { useState } from "react";
import { Backdrop, Box, Button, CircularProgress, Modal, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../state";
import FileList from "./fileList";

const Workspace = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      setSelectedFile(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/workspace/upload-file`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const responseData = await response.json();

        if (!responseData.error) {
          dispatch(uploadFile(responseData));
        } else {
          alert(responseData.error);
        }
      } catch (err) {
        alert(err);
      }
    }
    setSelectedFile(null);
    setLoading(false);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f7f9fc",
        borderRadius: "10px",
        p: "10px",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          style={{ display: "none" }}
          onChange={handleFileChange}
          id="fileInput"
        />
        <label htmlFor="fileInput">
          <Button variant="outlined" startIcon={<AddIcon />} component="span">
            New Image
          </Button>
        </label>
        <FileList />
        {selectedFile && (
          <Modal open={true} onClose={() => setSelectedFile(null)}>
            <Paper
              sx={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -40%)",
                width: "fit-content",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Image"
                  style={{ maxWidth: "100%", maxHeight: "min(70vh, 300px)" }}
                />
              )}
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                component="span"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </Paper>
          </Modal>
        )}
      </Box>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Paper>
  );
};

export default Workspace;
