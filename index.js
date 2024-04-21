import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import { dbConnection } from "./utils/index.js"
import path from "path"
import { fileURLToPath } from "url"
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js"
import routes from "./routes/index.js"

//resolving dirname for es module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)

dotenv.config()

dbConnection()

const PORT = process.env.PORT || 8800

const app = express()

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
)

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)
//Use the clent app
app.use(express.static(path.join(__dirname, "/client/dist")))

//Render frontend for any path that user goes to
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/dist/index.html"))
)
app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))