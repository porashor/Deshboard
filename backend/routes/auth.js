import { Router } from "express";
import db from "../db/mysql.js";
import transporter from "../libs/nodemail.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();



const app = Router();

app.get("/", async (req, res) => {
    try{
        const [users] = await db.query(`SELECT * FROM users`);
        res.status(200).json({ users });
    }catch(e){
        console.log(e);
    }
});


//user account create
app.post("/register", async (req, res) => {
    try{
        const { name, email, password } = req.body;
        // field check 
        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required"});
        }
        //is table exist or not
        const [table] =  await db.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, status VARCHAR(255) DEFAULT 'user')`);
        if(!table){
            return res.status(400).json({ message: "Table not created"});
        }
        // user exist check 
        const [row] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        if(row.length > 0){
            return res.status(400).json({ message: "User already exist"});
        }
        // create user
        const [user] = await db.execute(`INSERT INTO users (name, email, password, status) VALUES (?, ?, ?, ?)`, [name, email, password, "user"]);
        //send email from here
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Registration",
            text: "Registration successful",
            html: `<h1>Hi ${name},</h1>
            <p>Your account has been created successfully</p>
            <p>Login now</p>
            <a href=${process.env.HOST_LINK}>Login</a>
            <div>Your email is: ${email}</div>
            <div>Your password is: ${password}</div>`
        })
        //create balance table
        const [balance] = await db.execute(`CREATE TABLE IF NOT EXISTS balance (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, balance DECIMAL(10,2) DEFAULT 0.00)`);
        if(!balance){
            return res.status(400).json({ message: "Balance table not created"});
        }
        const [balanceInsert] = await db.execute(`INSERT INTO balance (email, balance) VALUES (?, ?)`, [email, 0.00]);
        if(!balanceInsert){
            return res.status(400).json({ message: "Balance not created"});
        }
        res.status(201).json({ message: "User created successfully", user});
    }catch(e){
        console.log(e);
    }
});

// admin account create 
app.post("/register-admin", async (req, res) => {
    try{
        const { name, email, password } = req.body;
        // field check 
        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required"});
        }
        //is table exist or not
        const [table] =  await db.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, status VARCHAR(255) DEFAULT 'user')`);
        if(!table){
            return res.status(400).json({ message: "Table not created"});
        }
        // user exist check 
        const [row] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        if(row.length > 0){
            return res.status(400).json({ message: "User already exist"});
        }
        // create user
        const [user] = await db.execute(`INSERT INTO users (name, email, password, status) VALUES (?, ?, ?, ?)`, [name, email, password, "admin"]);
        //send email from here
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Registration",
            text: "Registration successful",
            html: `<h1>Hi ${name}</h1>
            <p>your account has been created successfully</p>
            <p>login now</p>
            <a href="http://localhost:3000/login">Login</a>
            <div>Your email is: ${email}</div>
            <div>Your password is: ${password}</div>`
        })
        res.status(201).json({ message: "User created successfully", user});
    }catch(e){
        console.log(e);
    }
});



app.post("/login", async (req, res)=>{
    try {
        const { email, password } = req.body;
        // field check 
        if(!email, !password){
            return res.status(400).json({ message: "All fields are required"});
        }
        //check user exist or not
        const [row] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        if(row.length === 0){
            return res.status(400).json({ message: "User not found"});
        }
        //check password
        if(row[0].password !== password){
            return res.status(400).json({ message: "Invalid password"});
        }
        const createToken = jwt.sign({user: row}, process.env.JWT_SECRET);
        res.clearCookie("token");
        res.cookie("token", createToken, {httpOnly: true});
        
        res.status(201).json({ message: "user loged in", user: row});
    } catch (error) {
        console.log(error);
    }
})


app.get("/data", async (req, res)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({ message: "User not found"});
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        res.status(201).json({ message: "user loged in", data});
    } catch (error) {
        console.log(error);
    }
})

app.delete("/signout", async (req, res)=>{
    try {
        res.clearCookie("token");
        res.status(201).json({ message: "user loged out"});
    } catch (error) {
        console.log(error);
    }
})

app.delete("/", async (req, res) => {
    try{
        //is table exist or not
        await db.query(`DROP TABLE IF EXISTS users`);
        res.status(200).json({ message: "Table deleted successfully"});
    }catch(e){
        console.log(e);
    }
});


export default app;