const express = require("express");
const fs = require("fs");
const PORT = 5000;
const app = express();

app.use(express.static("public"));// to serve static files from the "public" directory
app.use(express.json());
app.use(express.urlencoded({extended: true})); // parsing form data 

const readfromFile = async() => {
    try{
        const data = await fs.promises.readFile("./students.json", "utf-8");
        return JSON.parse(data || "[]");
    }catch(err){
        console.log("error reading file", err);
    }
};

const writetoFile = async(data) => {
    try{
        await fs.promises.writeFile("./students.json", JSON.stringify(data));
    }catch(err){
        console.log("error writing file", err);
    }
};
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/form.html");
})

app.post("/students/register", async(req,res) =>{
    const {name, branch} = req.body;
    if(!name || !branch){
        return res.status(400).json({message: "Please fill in all fields"});
    }
    const students = await readfromFile();
    students.push({name, branch});
    await writetoFile(students);
    res.status(201).json({message: "Student registered successfully"});
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
