const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const file = require("./routes/file");
var bodyParser = require('body-parser')
const cors = require("cors")

const port = process.env.PORT || 8800
const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));


dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
      console.log("connected");     
  }
);
app.use(express.urlencoded({extended:true}));

app.use(bodyParser.urlencoded())
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json())

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/file", file);

app.get("/getusers", function (req, res) {
  mongoose.connect(process.env.MONGO_URL, function (err, db) {
    if (err) throw err;

    var coll = db.collection('users');

    coll.find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {

            res.send(JSON.stringify(result));
        }
    })

});
});
app.listen(port, () => {
  console.log("Backend server is running!");
});
