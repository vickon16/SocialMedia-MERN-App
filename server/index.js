import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


// routes
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import MessageRoute from "./routes/MessageRoute.js";
import { createError } from "./utils/handlers.js";
import {corsOptions} from "./corsOption.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.MONGODB_CONNECTION;

// middleware
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// connect to the database before we listen to server;
mongoose.connect(CONNECTION, {
    dbName: "SocialMedia-MERN-App",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, ()=>console.log(`Listening at port ${PORT}...`)))
  .catch((err) => console.log(err));

app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/posts", PostRoute);
app.use("/api/chats", ChatRoute);
app.use("/api/messages", MessageRoute);

// all routes that are not found;
app.all("/api/*", (req, res) => {
  res.status(404).json(createError(404, 'Page does not exist'));
})

// for errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
