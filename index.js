import express from "express";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import session from "cookie-session";
import router from "./src/routes/index.js";
import connectToMongoDB from "./src/db/connect.js";
import methodOverride from "method-override";
import path from "path";
import flash from "connect-flash";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.PORT || 3000;




app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "IMION_2024@101@..#$%^&*()_+~",
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== "development",
    },
  })
);
app.use(flash());
app.use(fileupload());
app.use(express.static("public"));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", router);

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${port}`);
});
