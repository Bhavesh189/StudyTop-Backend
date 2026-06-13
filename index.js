const express = require('express')
const app = express();
const connectDB = require('./config/db.js')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes.js')
const cookieParser = require('cookie-parser')
const courseRoutes = require('./routes/courseRoutes.js')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser());

connectDB();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.urlencoded({extended : true}))

app.use('/', userRoutes)
app.use('/', courseRoutes)


app.listen(3000, ()=> {
    console.log("SErver running on port 3000")
});