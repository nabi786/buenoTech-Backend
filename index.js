require('dotenv').config()
require("./config/dataBase")
const morgan = require("morgan")
const express = require('express')
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// global Middlewares
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
  
// app.use(cors(corsOpts));
// oriring error




// API Routes
const indexRout = require('./routers/index')
const LockToken = require('./routers/LockToken')



// using router as a global middleware
app.use(indexRout);
app.use("/api",LockToken);







// if router not found 
app.get("*", (req,res)=>{
    res.status(404).json({msg : "page not found"})
});



app.listen(PORT, () => {
        console.log(`server started successfully on PORT Number ${PORT}`)
    })