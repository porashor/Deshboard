import express from 'express';
import dotenv from 'dotenv';
import Auth from './routes/auth.js';
import transection from './routes/transection.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();





const app = express();
app.use(express.json());
app.use(cors({ 
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
}));
app.use(cookieParser());
app.use("/auth", Auth);
app.use("/deposite", transection);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})