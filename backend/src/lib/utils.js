import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const generateJwtToken = (payload, res) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // httpOnly: true ensures the cookie is only accessible by the web server, not JavaScript, which helps mitigate XSS attacks.
        httpOnly: true,
        // sameSite: "strict" restricts the browser from sending this cookie along with cross-site requests, reducing CSRF attack risk.
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}