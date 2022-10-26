import fs from "fs";
import path from "path";
import http, { IncomingMessage, Server, ServerResponse } from "http";
import database from './database/database.json';
// import { getAllJSDocTags } from "typescript";
import { getAllData, addData, updateData, deleteData } from "./controller"
/*
implement your server code here
*/


const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url == "/info") {
      return getAllData(req, res);
    } else if (req.method == "PUT" && req.url == "/info") {
      return updateData(req, res);
    } else if (req.method == "DELETE" && req.url == "/info") {
      return deleteData(req, res);
    } else if (req.method == "POST" && req.url == "/info") {
      return addData(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json'})
      res.end(JSON.stringify({ message: 'Route Not Found'}));
  }
  }
);

      



const PORT = process.env.PORT || 3001
server.listen(3001, () => console.log(`Server  is running on Port ${PORT}`));
