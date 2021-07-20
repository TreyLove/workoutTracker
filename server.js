const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
require("dotenv").config()

const port = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(morgan("combined"));

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
);

app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/index.js"));

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});