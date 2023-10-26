import express from "express"; 
import dotenv from 'dotenv'
import router from "./routes/router.js";
import cors from "cors"
import db from "./db/db.js"
import cookieParser from "cookie-parser";

const port = 3000;
const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use('/api', router)



dotenv.config();

app.get('/',async (req, res) =>{
    console.log(req)
    res.status(200).json("Работаем")
})
const startapp  = async () => {
    try {
        await db.connect()
        app.listen(port, "26.249.118.112" , () => {  
            console.log('http://26.249.118.112:' + port)
        });

    } catch (error) {
        console.log(error)
    }
}
startapp()
export default app;