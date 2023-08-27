import User from "../models/User.js";
import { fileNameGenerator } from "../services/randomGenerator.js";
import multer from "multer";
import dotenv from "dotenv";
import sharp from "sharp";
import axios from "axios";
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const awsConfiguration = {
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

const clientS3 = new S3Client(awsConfiguration);

const createPresignedUrlWithClient = ({ bucket, key, time = 60 }) => {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(clientS3, command, { expiresIn: time });
};

const azure_endpoint = process.env.AZURE_AI_VISION_ENDPOINT;
const azure_apikey = process.env.AZURE_AI_VISION_API_KEY;

export const getFile = async (req, res) => {
  try {
    const _id = req.user._id;
    const { fileID } = req.params;
    const { isOptimized } = req.query;

    const user = await User.findOne({ _id: _id });

    if (!user) {
      return res.status(400).json({
        error: "User does not exist. Please login back and try again.",
      });
    }

    const file = user.files.find((file) => file.reference === fileID);

    if (!file) {
      return res.status(404).json({
        error: "File not found in user's files.",
      });
    }
    const keyPrefix = isOptimized !== "false" ? "optimizedReference_" : "";

    const preSignedURL = await createPresignedUrlWithClient({
      bucket: process.env.AWS_S3_BUCKET_NAME,
      key: `${keyPrefix}${fileID}`,
    });

    const response = await axios.get(preSignedURL, {
      responseType: "arraybuffer",
    });
    const imageData = await response.data;
    let mimeType = "";
    if (
      imageData[0] === 0x89 &&
      imageData[1] === 0x50 &&
      imageData[2] === 0x4e &&
      imageData[3] === 0x47
    ) {
      mimeType = "image/png";
    } else if (imageData[0] === 0xff && imageData[1] === 0xd8) {
      mimeType = "image/jpeg";
    }
    const dataUrl = `data:${mimeType};base64,${Buffer.from(imageData).toString(
      "base64"
    )}`;
    file.reference = dataUrl;

    return res.status(200).json({ file });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured!" });
  }
};

export const getFiles = async (req, res) => {
  try {
    const _id = req.user._id;

    const user = await User.findOne({ _id: _id });

    if (!user) {
      return res.status(400).json({
        error: "User does not exist. Please login back and try again.",
      });
    }

    return res.status(200).json({ files: user.files });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured!" });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const _id = req.user._id;

    const user = await User.findOne({ _id: _id });

    if (!user) {
      return res.status(400).json({
        error: "User does not exist. Please login back and try again.",
      });
    }

    upload.single("file")(req, res, async function (err) {
      try {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "An error occurred during file upload." });
        }

        const fileBytes = req.file;
        const fileName = fileNameGenerator(user.firstName);
        const command = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: fileName,
          Body: fileBytes.buffer,
          ContentType: fileBytes.mimetype,
        });

        await clientS3.send(command);
        const metadata = await sharp(fileBytes.buffer).metadata();
        const width = metadata.width;
        const height = metadata.height;

        const currentFormat = fileBytes.mimetype.split("/")[1];
        let optimizeOptions = {};
        if (currentFormat === "jpeg" || currentFormat === "jpg") {
          optimizeOptions = {
            quality: 80,
          };
        } else {
          optimizeOptions = {
            quality: 80,
            format: "jpeg",
          };
        }

        const sharpImage = sharp(fileBytes.buffer)
          .resize({ width: Math.round(metadata.width / 2) })
          .jpeg(optimizeOptions);
        const optimizedImageBuffer = await sharpImage.toBuffer();

        const command2 = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `optimizedReference_${fileName}`,
          Body: optimizedImageBuffer,
          ContentType: "image/jpeg",
        });
        await clientS3.send(command2);

        let tags = [];
        try {
          const url = `${azure_endpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags`;
          const headers = {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": azure_apikey,
          };
          const bodyData = optimizedImageBuffer;
          const response = await axios.post(url, bodyData, { headers });
          const tagsResult = response.data.tagsResult.values;
          const filteredTags = tagsResult.filter(
            (tag) => tag.confidence >= 0.8
          );
          tags = filteredTags.map((tag) => tag.name);
        } catch (err) {
          console.log(err);
        }

        const file = {
          reference: fileName,
          optimizedReference: `optimizedReference_${fileName}`,
          name: fileBytes.originalname,
          tags: tags,
          lastModified: new Date(),
          properties: {
            position: {
              x: 0,
              y: 0,
            },
            size: {
              width: width,
              height: height,
            },
            canvasSize: {
              width: width,
              height: height,
            },
            scale: {
              x: 1,
              y: 1,
            },
            effects: {
              brightness: 1,
              contrast: 1,
              saturation: 1,
              blur: 0,
            },
          },
        };

        user.files.push(file);

        await user.save();

        return res.status(200).json({ file });
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "An error occurred during file processing." });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured!" });
  }
};

export const updateFile = async (req, res) => {
  try {
    const _id = req.user._id;
    const { file } = req.body;
    const user = await User.findOne({ _id: _id });

    if (!user) {
      return res.status(400).json({
        error: "User does not exist. Please login back and try again.",
      });
    }

    const fileIndex = user.files.findIndex(
      (userFile) => userFile._id.toString() === file._id
    );

    if (fileIndex === -1) {
      return res.status(400).json({
        error: "File not found in the user's files array.",
      });
    }

    const existingFile = user.files[fileIndex];
    const updatedFile = { ...file };
    updatedFile.reference = existingFile.reference;
    updatedFile.lastModified = new Date();
    user.files[fileIndex] = updatedFile;
    await user.save();

    res.status(200).json({ message: "File updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured!" });
  }
};
