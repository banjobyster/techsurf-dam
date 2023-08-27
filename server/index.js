import express from "express"; // Express Server
import bodyParser from "body-parser"; // For parsing body of requests in desired format
import mongoose from "mongoose"; // Library for easy use of mongodb
import cors from "cors"; // Library to allow cross origin requests
import dotenv from "dotenv"; // For extracting data from env files
import morgan from "morgan"; // For logging requests into console

import authRoutes from "../server/routes/auth.js" // importing authentication related routers
import workspaceRoutes from "../server/routes/workspace.js" // importing workspace routers

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/workspace", workspaceRoutes);

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));

