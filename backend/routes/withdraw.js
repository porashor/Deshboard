import { Router } from "express";
import {getUser} from "../libs/getuser.js";
import db from "../db/mysql.js";

const app = Router();

// route test 
app.get("/", async (req, res) => {
    try{
        res.status(200).json({ message: "Hello world"});
    }catch(e){
        console.log(e);
    }
})
// payment system create after this ????

//name, email, amount, status, date

// withdraw request 
app.post("/request", getUser, async (req, res) => {
    const {name, email} = req.user
    try {
        const {sendAmount} = req.body;
        //amount figured
        if(sendAmount < 500){
            return res.status(400).json({ message: "Amount must be more than 500"});
        }
        const takeNum = (sendAmount * 0.018).toFixed(2)
        const total = Number(takeNum) + Number(sendAmount)
        // check balance if it is enough 
        const [balance] = await db.query(`SELECT * FROM balance WHERE email = ? `, [email]);
        if(!balance){
            return res.status(400).json({ message: "Balance not found"});
        }
        if(parseFloat(balance[0].balance) < total){
            return res.status(400).json({ message: "Balance not enough"});
        }
        // check after create withdraw table 
        const [withdrawTable] = await db.execute(`CREATE TABLE IF NOT EXISTS withdraw (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            sendAmount VARCHAR(255) NOT NULL,
            status VARCHAR(255) DEFAULT 'pending',
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`)
        if(!withdrawTable){
            return res.status(400).json({ message: "Withdraw table not created"});
        }
        const [user] = await db.execute(`INSERT INTO withdraw (name, email, sendAmount, status) VALUES (?, ?, ?, ?)`, [name, email, total, "pending"]);
        if(!user){
            return res.status(400).json({ message: "Withdraw request not sent"});
        }
        res.status(200).json({ message: "Withdraw request sent successfully"});
    } catch (error) {
        console.log(error)
    }
})

// get all withdraw data 
app.get('/user-withdraw', getUser, async (req, res) => {
    const {email} = req.user
    try {
        const [user] = await db.query(`SELECT * FROM withdraw WHERE email = ? `, [email]);
        if(!user){
            return res.status(400).json({ message: "Withdraw not found"});
        }
        res.status(201).json({ message: "User withdraw", user});
    } catch (error) {
        console.log(error);
    }
})


//admin get all of the withdraw request 
app.get("/all-withdraw", async (req, res) => {
    try {
        const [user] = await db.query(`SELECT * FROM withdraw`);
        if(!user){
            return res.status(400).json({ message: "Withdraw request not found"});
        }
        res.status(201).json({user});
    } catch (error) {
        console.log(error);
    }
})

//admin update the withdraw
app.put("/status-update", async (req, res) => {
    try {
        const {email, amount, status, id} = req.body;
        const [user] = await db.execute(`UPDATE withdraw SET status = ? WHERE id = ?`, [status, id]);
        if(!user){
            return res.status(400).json({ message: "Withdraw request not updated"});
        }
        //status cencel 
        if(status === 'cencel'){
            return res.status(201).json({ message: "Withdraw request cencelled"});
        }
        //update user balance amount
        const [balance] = await db.query(`SELECT * FROM balance WHERE email = ? `, [email]);
        if(!balance){
            return res.status(400).json({ message: "Balance not found"});
        }
        const mainMoney = parseFloat(balance[0].balance) - parseFloat(amount);
        const [balanceUpdate] = await db.query(`UPDATE balance SET balance = ? WHERE email = ?`, [mainMoney, email]);
        if(!balanceUpdate){
            return res.status(400).json({ message: "Balance not updated"});
        }
        res.status(201).json({ message: "Withdraw request updated successfully"});
    } catch (error) {
        console.log(error);
    }
})



export default app;