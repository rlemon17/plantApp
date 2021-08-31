const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect other routes
const userRouter = require('./routes/user.route');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

//Connect other routes
app.use('/users', userRouter);

app.get("/", (req, res) => res.send("test"));

app.listen(3000, () => console.log("Started on Port 3000"));