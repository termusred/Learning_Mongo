import express from "express"
import Connector from "./db/index.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true // If you're dealing with cookies or sessions
}));


app.use(express.json())
app.use(express.static("uploads"))




Connector()

app.listen(3000 , ()=>{
    console.log("Server is running on http://localhost:3000");
})