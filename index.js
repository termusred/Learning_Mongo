import express from "express"
import Connector from "./db/index.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import user from "./modules/users/__api.js"
import book from "./modules/books/__api.js"
const app = express()

app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));


app.use(express.json())
Connector()

app.use(express.static("uploads"))
app.use(user)
app.use(book)





app.listen(3000 , ()=>{
    console.log("Server is running on http://localhost:3000");
})