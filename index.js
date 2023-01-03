require('dotenv').config()
require("./config/dataBase")
const morgan = require("morgan")
const express = require('express')
const app = express();
const PORT = 5000 || process.env.PORT;
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// global Middlewares
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
// working

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
const LockBNB = require('./routers/lockBNB')



// using router as a global middleware
app.use(indexRout);
app.use("/api",LockToken);
app.use("/api",LockBNB);







// if router not found 
app.get("*", (req,res)=>{
    res.status(404).json({msg : "page not found"})
});



app.listen(PORT, () => {
        console.log(`server started successfully on PORT Number ${PORT}`)
    })