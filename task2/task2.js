const http = require('http');
const url = require('url');
const fs = require("fs");
const { parse } = require('path');

const server = http.createServer((req, res) =>{
    if(req.url.startsWith("/complain")){
        const parsedUrl = url.parse(req.url, true);
        const name = parsedUrl.query.name;
        const issue = parsedUrl.query.issue;
        const priority = parsedUrl.query.priority;

        if(!name || !issue || !priority){
        res.writeHead(400, {"content-type":"text/plain"});
        res.end("Missing name or issue or priority");
        return;
    }
    const TKT_id = Math.floor(Math.random()*1000)+1000;
    const log = `Name : ${name}\n` + `Issue : ${issue}\n`+`TKT : ${TKT_id}\n\n`;
    if(priority==="high"){
        fs.appendFileSync("URGENT.text", log)
    }else{
        fs.appendFileSync("Normal_complaints.txt",log)
    }

    res.writeHead(200, {"content-type" : "text/plain"});
    res.end(
        `Name : ${name}\n`+ `Ticket ID : ${TKT_id}\n`+
        "We will solve your issue soon."
    )
    }else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(5000, ()=>{
    console.log("Server running on http://localhost:5000");
});