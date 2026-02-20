const http = require('http');
const fs = require('fs').promises;
const express = require('express');
const app = express();

app.use(express.json());
const PORT = 3000;
const readfile = async () => {
  const data = await fs.readFile("./db.json", "utf-8");
  return JSON.parse(data);
};
const writefile = async (data) => {
    await fs.writeFile("./db.json", JSON.stringify(data));
}

let users = [];
(async () => {
    users = await readfile();
})();

const reponseTimeLog = (req, res, next) => {
    const st = Date.now();
    res.on("finish", () => {
        const end = Date.now();
        const duration = end - st;
        console.log(`Request to ${req.path} took ${duration}ms`);
    })
    next();
}
app.use(reponseTimeLog);

app.get("/", async (req, res) => {
    res.send("Welcome to the User API");
});
app.get("/users", async(req, res) => {
   const { name } = req.query;

    let filteredUsers = users;

    if(name){
        filteredUsers=filteredUsers.filter(user =>user.name.toLowerCase().includes(name.toLowerCase()));
    }
    res.json(filteredUsers);
});
// app.get("/users/:id", (req,res) =>{
    
// });

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});