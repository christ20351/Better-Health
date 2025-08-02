import { auth } from './src/utils/auth';
import { userRoute } from './src/route/user.route';
import express, { Request, Response } from 'express';
import expressWs from 'express-ws';
import env from 'dotenv';
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from 'cors';
import cookieparser from "cookie-parser";

const app = express();

const appWs = expressWs(app); // Initialiser express-ws
const server = appWs.app;

server.use(  
  cors({
    origin: "http://localhost:8081",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
server.post("/api/auth/sign-in/email" , toNodeHandler(auth));
server.post("/api/auth/sign-in/social" , toNodeHandler(auth))
server.post("/api/auth/sign-up/email" , toNodeHandler(auth))
server.post("/api/auth/send-verification-email" , toNodeHandler(auth))
server.get("/api/auth/callback/google" , toNodeHandler(auth))
server.get("/api/auth/callback/google" , toNodeHandler(auth))
server.get("/api/auth/verify-email" , toNodeHandler(auth))
// server.get("/?error=token_expired" , async (req:Request , res:Response) => {
//     res.redirect('http://localhost:8081/login/user')
// })


env.config();
server.use(express.json());
server.use(cookieparser());
server.use(userRoute)

// Route de base
server.get('/api', (req, res) => {
    console.log('helloword!!')
    res.json({ message: 'Hello World!' });
    // res.send('WebSocket server is running');
});

// app.use('*' , (req , res) => {
//   res.send("Not Found")
// } )


// Gestion des connexions WebSocket
server.ws('/ws', (ws, req) => {
    console.log('New client connected');

    // Écouter les messages entrants
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Renvoyer le message au client
        ws.send(`Server received: ${message}`);
    });

    // Gérer la déconnexion du client
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});