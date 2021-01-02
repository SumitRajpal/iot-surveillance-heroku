const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const app = express();

const WS_PORT  = process.env.PORT || 80;
const HTTP_PORT =  process.env.PORT || 3000;

const wsServer = new WebSocket.Server({port: WS_PORT}, ()=> console.log(`WS Server is listening at ${WS_PORT}`));
let connectedClients = [];
console.log(WS_PORT,HTTP_PORT)
wsServer.on('connection', (ws, req)=>{
    console.log('Connected');
    connectedClients.push(ws);

    ws.on('message', data => {
        connectedClients.forEach((ws,i)=>{
            if(ws.readyState === ws.OPEN){
                ws.send(data);
            }else{
                connectedClients.splice(i ,1);
            }
        })
    });
});

app.get('/client',(req,res)=>res.sendFile('./client.html', { root: __dirname }));
app.listen(HTTP_PORT, ()=> console.log(`HTTP server listening at ${HTTP_PORT}`));