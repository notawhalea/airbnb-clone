const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const bcrypt = require("bcryptjs");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dsvjds54d4dsvdsdsv54ds";
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(express.json());
app.use(cors(corsOptions));
//Oxh7tRL2UYqRkgJ0
mongoose.connect(process.env.MONGO_URL);
app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
              httpOnly: true,
            })
            .json("pass ok");
        },
      );
    } else {
      res.status(422).json("didnt match");
    }
  } else {
    res.json("not found");
  }
});

app.listen(4000);
