//name, email, sendAmount, status, transectionId, date, deposite or widraw
import { Router } from "express";
import db from "../db/mysql.js";
import dotenv from "dotenv";
import getUser from "../libs/getuser.js";

dotenv.config();

const app = Router();

app.get("/", async (req, res) => {
    try{
        res.status(200).json({ message: "Hello world"});
    }catch(e){
        console.log(e);
    }
})

// user send transection request (user) varified
app.post("/", getUser, async (req, res) => {
    const {name, email} = req.user
    const {
        transectionId,
        sendAmount
    } = req.body;
    try {
        if(!transectionId || !sendAmount){
            return res.status(400).json({ message: "All fields are required"});
        }
        const [table] = await db.execute(`CREATE TABLE IF NOT EXISTS transection (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            sendAmount VARCHAR(255) NOT NULL,
            status VARCHAR(255) DEFAULT 'pending',
            transectionId VARCHAR(255) NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`)
        if(!table){
            return res.status(400).json({ message: "Table not created"});
        }
        const [user] = await db.execute(`INSERT INTO transection (name, email, sendAmount, transectionId) VALUES (?, ?, ?, ?)`, [name, email, sendAmount, transectionId]);
        if(!user){
            return res.status(400).json({ message: "Transection request not sent"});
        }
        res.status(201).json({ message: "Transection request sent successfully", user});
    } catch (error) {
        console.log(error);
    }
})


// user request all history (user) varified
app.get("/user-history", getUser, async (req, res) => {
    const {email} = req.user
    try {
        const [user] = await db.query(`SELECT * FROM transection WHERE email = ? `, [email]);
        if(!user){
            return res.status(400).json({ message: "Transection not found"});
        }
        res.status(201).json({ message: "User history", user});
    } catch (error) {
        console.log(error);
    }
})

//admin get all transection request and updated (admin) after getting filter all by status  varified
app.get("/all-transection", async (req, res) => {
    try {
        const [user] = await db.query(`SELECT * FROM transection`);
        if(!user){
            return res.status(400).json({ message: "Transection not found"});
        }
        res.status(201).json({ message: "All transection request", user});
    } catch (error) {
        console.log(error);
    }
})

// update deposite success or cancel by (admin) varified
app.put("/status-update", async (req, res) => {
    const {
        transectionId,
        sendAmount,
        status,
        email
    } = req.body;
    try {
        if(!transectionId || !status || !sendAmount){
            return res.status(400).json({ message: "All fields are required"});
        }
        const [user] = await db.execute(`UPDATE transection SET status = ? WHERE transectionId = ?`, [status, transectionId]);
        if(!user){
            return res.status(400).json({ message: "Transection request not updated"});
        }
        //user (balance) table load here get current balance and update(add)--history date and amount
        const [balance] = await db.query(`SELECT * FROM balance WHERE email = ? `, [email]);
        if(!balance){
            return res.status(400).json({ message: "Balance not found"});
        }
        console.log(balance)
        const mainMoney = parseFloat(balance[0].balance) + parseFloat(sendAmount);
        console.log(mainMoney)
        if(status === "cencel"){
            res.sendStatus(201).json({ message: "Transection request cencelled", user});
        }
        const [balanceUpdate] = await db.query(`UPDATE balance SET balance = ? WHERE email = ?`, [mainMoney, email]);
        if(!balanceUpdate){
            return res.status(400).json({ message: "Balance not updated"});
        }
        res.status(201).json({ message: "Transection request updated successfully", user});
    } catch (error) {
        console.log(error);
    }
})


app.get("/user-balance", getUser, async (req, res) => {
    const {email} = req.user
    try {
        const [user] = await db.query(`SELECT * FROM balance WHERE email = ? `, [email]);
        if(!user){
            return res.status(400).json({ message: "Balance not found"});
        }
        res.status(201).json(user[0]);
    } catch (error) {
        console.log(error);
    }
})





export default app;


