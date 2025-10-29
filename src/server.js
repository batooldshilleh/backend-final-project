import fs from "fs";
import http from "http";
import http2 from "http2";
import app from "./app.js";        

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 7000;

const httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT, () => {
  console.log(`🌐 HTTP/1.1 Server running on http://localhost:${HTTP_PORT}`);
});

const options = {
  key: fs.readFileSync("./key.pem"),     
  cert: fs.readFileSync("./cert.pem"),    
  allowHTTP1: true,    
};

const http2Server = http2.createSecureServer(options, app);
http2Server.listen(HTTPS_PORT, () => {
  console.log(`⚡ HTTP/2 Server running on https://localhost:${HTTPS_PORT}`);
});
