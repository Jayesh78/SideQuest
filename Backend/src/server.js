import express from "express";
import cors from "cors"
import dotenv from "dotenv";


import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();


//middleware
app.use(cors({
  origin : "http://localhost:5173"
}));
app.use(express.json())
app.use(rateLimiter)


app.use(((req,res,next)=>{
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
}))

app.use("/api/notes", noteRoutes);

connectDB().then(()=>{
  app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
})
});


