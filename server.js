const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const config = require('config');
const register = require("./routes/api/register");
const login = require("./routes/api/login");
const newJob = require('./routes/api/newJob');
const allJob = require('./routes/api/allJob')
const allStudent = require('./routes/api/allStudent')
const allCompany = require('./routes/api/allCompany');
const deleteReq = require('./routes/api/delete');


const app = express();
app.use(cors())
//body parser middleware

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)
app.use(
    bodyParser.json() 
);


//Databse config
const db = config.get('mongoURI'); //this is because we dont show to anyone our mongo uri file pubic 
// const db = "mongodb://ayyan:ayyan123@ds237641.mlab.com:37641/first-database"

//connect to Mongo db 
mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        
    }
).then(() => console.log("mongo db succesfully connected"))
.catch((err) => console.log("mongo db connection failed due to: ",err.message));

//passport middleware
// app.use(passport.initialize());

//passport config
// require("./config/passport");

//routes

// app.post('/api/register',function(req,res,next){
//     console.log(req.body);
// })

app.use('/api/register',  register )
app.use('/api/login',  login )
app.use('/api/newJob',  newJob );
app.use('/api/alljob',  allJob );
app.use('/api/allStudent',  allStudent );
app.use('/api/allCompany',  allCompany );
app.use('/api/admindel',  deleteReq );


//server seetings
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server is running on port ${port}`) ) ;

