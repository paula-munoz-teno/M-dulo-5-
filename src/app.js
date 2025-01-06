const express = require("express")
const cors = require('cors')
const studentRouters = require("./routes/student.routes.js")
const errorHandling = require("./error/errorHandling.js")

const app = express();
 
app.set("port", process.env.PORT || 3001)

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(studentRouters);
app.use(function(req, res, next)
    {
        res.status(404).json({message: "Endpoint doesnt found"})
    })

app.use(errorHandling);

module.exports = app;
