import {
  Box,
  Chip,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  ButtonGroup,
  FormControlLabel,
  Switch,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DownloadIcon from "@mui/icons-material/Download";

const MetaDataSpace = ({
  editedFile,
  setEditedFile,
  saveData,
  isEdited,
  imgRef,
}) => {
  const isMobileDisplay = useMediaQuery("(min-width:400px)");
  const [isEditingName, setIsEditingName] = useState(false);
  const [updatedName, setUpdatedName] = useState(editedFile?.name || "");
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [infoText, setInfoText] = useState(
    "Click on name or tags to edit them!"
  );
  const [selectedFormat, setSelectedFormat] = useState("png");
  const urlSearchParams = new URLSearchParams(window.location.search);
  const initialIsOptimized = urlSearchParams.get("isOptimized") === "true";
  const [isOptimized, setIsOptimized] = useState(initialIsOptimized);
  const [applyEffects, setApplyEffects] = useState(true);

  const handleOptimizationChange = () => {
    setIsOptimized((prevState) => !prevState);
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (isOptimized) {
      urlSearchParams.delete("isOptimized");
    } else {
      urlSearchParams.set("isOptimized", "true");
    }
    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
    window.location.reload();
  };

  useEffect(() => {
    if(isOptimized == false) {
      setApplyEffects(false);
    }
  }, [isOptimized]);

  const [updatedTags, setUpdatedTags] = useState(
    editedFile?.tags ? editedFile.tags.join(", ") : ""
  );

  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
    setEditedFile({ ...editedFile, name: updatedName });
  };

  const handleTagsClick = () => {
    setIsEditingTags(true);
    setInfoText("Comma seperated words are made into seperate tags");
  };

  const handleTagsChange = (e) => {
    setUpdatedTags(e.target.value);
  };

  const handleTagsBlur = () => {
    setIsEditingTags(false);
    const updatedTagsArray = updatedTags.split(",").map((tag) => tag.trim());
    setEditedFile({ ...editedFile, tags: updatedTagsArray });
    setInfoText("Click on name or tags to edit them!");
  };

  const downloadFilteredImage = async () => {
    if (applyEffects) {
      const imgElement = imgRef.current;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
      context.filter = `brightness(${
        editedFile.properties.effects.brightness || 1
      }) contrast(${editedFile.properties.effects.contrast || 1}) saturate(${
        editedFile.properties.effects.saturation || 1
      }) blur(${editedFile.properties.effects.blur || 0}px)`;
      context.setTransform(
        editedFile.properties.scale.x || 1,
        0,
        0,
        editedFile.properties.scale.y || 1,
        0,
        0
      );
      context.drawImage(imgElement, 0, 0);
      const dataURL =
        selectedFormat === "png"
          ? canvas.toDataURL("image/png")
          : canvas.toDataURL("image/jpeg");
      const downloadLink = document.createElement("a");
      downloadLink.href = dataURL;
      downloadLink.download = `${editedFile.name}.${selectedFormat}`;
      downloadLink.click();
    } else {
      console.log(editedFile)
      const originalImageURL = `${editedFile.reference}`;
      const response = await fetch(originalImageURL);
      const blob = await response.blob();
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = `${editedFile.name}.${selectedFormat}`;
      downloadLink.click();
    }
  };

  return (
    <Box p="0px 5px" display="flex">
      <Box flex={1}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobileDisplay ? "row" : "column",
            gap: isMobileDisplay ? "10px" : "0px",
            p: "0px 10px",
          }}
        >
          <Typography variant="h6">Name :</Typography>
          {isEditingName ? (
            <input
              type="text"
              value={updatedName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              autoFocus
            />
          ) : (
            <Typography
              variant="h6"
              color="text.secondary"
              onClick={handleNameClick}
              minWidth="40px"
              sx={{
                border: `${updatedName === "" ? "1px solid gray" : ""}`,
                borderRadius: "6px",
              }}
            >
              {editedFile?.name}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobileDisplay ? "row" : "column",
            gap: isMobileDisplay ? "10px" : "0px",
            p: "0px 10px",
          }}
        >
          <Typography variant="h6">Tags :</Typography>
          {isEditingTags ? (
            <TextareaAutosize
              value={updatedTags}
              onChange={handleTagsChange}
              onBlur={handleTagsBlur}
              autoFocus
            />
          ) : (
            <Typography
              variant="h6"
              onClick={handleTagsClick}
              minWidth="40px"
              color="text.secondary"
              sx={{
                border: `${updatedTags === "" ? "1px solid gray" : ""}`,
                borderRadius: "6px",
              }}
            >
              {editedFile?.tags.map((tag, key) => (
                <Chip label={tag} key={key} sx={{ margin: "2px" }} />
              ))}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            color: "warning.main",
            fontSize: "14px",
            opacity: 0.5,
            pt: "5px",
            pl: "7px",
          }}
        >
          <LightbulbIcon fontSize="10px" />
          <p style={{ margin: "3px 0px 0px 0px" }}>{infoText}</p>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Box>
          <IconButton
            onClick={saveData}
            color={isEdited ? "primary" : "secondary"}
          >
            <SaveIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={downloadFilteredImage}>
            <DownloadIcon fontSize="large" />
          </IconButton>
        </Box>
        <ButtonGroup
          variant="outlined"
          color="primary"
          aria-label="image-format"
          disabled={applyEffects ? "" : "true"}
        >
          <Button
            onClick={() => setSelectedFormat("png")}
            variant={selectedFormat === "png" ? "contained" : "outlined"}
            size="small"
          >
            PNG
          </Button>
          <Button
            onClick={() => setSelectedFormat("jpeg")}
            variant={selectedFormat === "jpeg" ? "contained" : "outlined"}
            size="small"
          >
            JPEG
          </Button>
        </ButtonGroup>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={isOptimized}
                onChange={handleOptimizationChange}
                color="primary"
              />
            }
            label={isOptimized ? "Optimized" : "Original"}
          />
        </Box>
        <Box>
          <FormControlLabel
            label={applyEffects ? "Download with effects" : "Download without effects"}
            control={
              <Switch
                checked={applyEffects}
                onChange={() => setApplyEffects(!applyEffects)}
                color="primary"
              />
            }
            disabled={isOptimized ? "" : true}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MetaDataSpace;
