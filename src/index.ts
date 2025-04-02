import express from "express"
import cors from "cors"
import http from "http"
import compression from "compression"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"


const app = express()
app.use(cors(
    {
        credentials: true
    }
))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log("Server is running on", process.env.APP_URL);
})