import jwt from "jsonwebtoken";
import db from "../db/mysql.js";
import dotenv from "dotenv";

dotenv.config();

export const getUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const reqEmail = decoded.user[0].email;
        const [user] = await db.query(`SELECT * FROM users WHERE email = ?`, [reqEmail]);
        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }
        req.user = user[0];
        next();
    } catch (error) {
        console.log(error);
    }
};

export default getUser;