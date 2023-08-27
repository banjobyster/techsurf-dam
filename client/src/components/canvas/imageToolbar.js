import * as React from "react";
import { Box, Slider, Typography, TextField, IconButton } from "@mui/material";
import CropIcon from '@mui/icons-material/Crop';

const ImageToolbar = ({ editedFile, setEditedFile, isCropping, setIsCropping }) => {
  const handleEffectChange = (event, newValue, effectName) => {
    setEditedFile((prevFile) => ({
      ...prevFile,
      properties: {
        ...prevFile.properties,
        effects: {
          ...prevFile.properties.effects,
          [effectName]: newValue,
        },
      },
    }));
  };

  const handleScaleChange = (event, newValue, dir) => {
    setEditedFile((prevFile) => ({
      ...prevFile,
      properties: {
        ...prevFile.properties,
        scale: {
          ...prevFile.properties.scale,
          [dir]: newValue,
        },
      },
    }));
  };

  return (
    <Box p="10px">
      <Typography ml="5px" variant="h6">Edit Properties</Typography>
      <div>
        {/* <div>
          <Typography fontSize="14px" ml="20px" fontFamily='"Roboto","Helvetica","Arial",sans-serif' color="rgba(0, 0, 0, 0.6)" >Scale X</Typography>
          <Slider
            value={editedFile.properties.scale.x}
            onChange={(event, newValue) =>
              handleScaleChange(event, newValue, "x")
            }
            size="small"
            valueLabelDisplay="auto"
            min={0.1}
            max={10}
            step={0.1}
          />
        </div>
        <div>
          <Typography fontSize="14px" ml="20px" fontFamily='"Roboto","Helvetica","Arial",sans-serif' color="rgba(0, 0, 0, 0.6)" >Scale Y</Typography>
          <Slider
            value={editedFile.properties.scale.y}
            onChange={(event, newValue) =>
              handleEffectChange(event, newValue, "y")
            }
            size="small"
            valueLabelDisplay="auto"
            min={0.1}
            max={10}
            step={0.1}
          />
        </div> */}
        <div>
          <Typography fontSize="14px" ml="20px" fontFamily='"Roboto","Helvetica","Arial",sans-serif' color="rgba(0, 0, 0, 0.6)" >Brightness</Typography>
          <Slider
            value={editedFile.properties.effects.brightness}
            onChange={(event, newValue) =>
              handleEffectChange(event, newValue, "brightness")
            }
            size="small"
            valueLabelDisplay="auto"
            min={0.01}
            max={1}
            step={0.01}
          />
        </div>
        <div>
          <Typography fontSize="14px" ml="20px" fontFamily='"Roboto","Helvetica","Arial",sans-serif' color="rgba(0, 0, 0, 0.6)" >Contrast</Typography>
          <Slider
            value={editedFile.properties.effects.contrast}
            onChange={(event, newValue) =>
              handleEffectChange(event, newValue, "contrast")
            }
            size="small"
            valueLabelDisplay="auto"
            min={0.01}
            max={2}
            step={0.01}
          />
        </div>
        <div>
          <Typography fontSize="14px" ml="20px" fontFamily='"Roboto","Helvetica","Arial",sans-serif' color="rgba(0, 0, 0, 0.6)" >Saturation</Typography>
          <Slider
            value={editedFile.properties.effects.saturation}
            onChange={(event, newValue) =>
              handleEffectChange(event, newValue, "saturation")
            }
            size="small"
            valueLabelDisplay="auto"
            min={0.01}
            max={2}
            step={0.01}
          />
        </div>
        <div>
          <Typography fontSize="14px" ml="20px" fontFamily='"Roboto","Helvetica","Arial",sans-serif' color="rgba(0, 0, 0, 0.6)" >Blur</Typography>
          <Slider
            value={editedFile.properties.effects.blur}
            onChange={(event, newValue) =>
              handleEffectChange(event, newValue, "blur")
            }
            size="small"
            valueLabelDisplay="auto"
            min={0.01}
            max={10}
            step={0.1}
          />
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <IconButton onClick={() => setIsCropping(!isCropping)}>
            <CropIcon color={isCropping ? "secondary" : "primary" }/>
          </IconButton>
        </Box>
      </div>
    </Box>
  );
};

export default ImageToolbar;
