const express=require("express");
const fs=require("fs");

const app=express();
app.use(express.json());
const PORT =8000;
app.get("/",(req,res)=>{
    res.send("Welcome to home page")
})

const students=[
    {id:1,name:"Kate", branch:"CS"},
    {id:2,name:"Nicholas", branch:"ECE"},
    {id:3,name:"Ash", branch:"Ec"},
    {id:4,name:"Pratha", branch:"Cyber"}

]
app.get("/users",(req,res)=>{
    
    res.json(students);
    fs.readFile("./students.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).send("Error reading student data")
        }

        const students = JSON.parse(data || "[]");
        console.log("type of students", typeof(students));
    });
})
app.get("/users/:id",(req,res)=>{
    const userId=req.params.id
    res.send(`You are requesting for User Id:${userId}`)
})
app.get("/students/search",(req,res)=>{
    const branch=req.query.branch;
    console.log("branch",branch);
    if(!branch){
        return res.json(students);
    }
    const foundStudents=students.filter(s=>s.branch==branch);
    res.json(foundStudents);

})


app.get("/students/:id",(req,res)=>{
    const id =req.params.id;

    const arrayIndex=students.findIndex(s=>s.id==id);
    if(arrayIndex<0){
        return res.status(404).send("Student not found");
    }

    const data =students[arrayIndex];
    res.json(data);

})
app.post("/students/register",(req,res)=>{
    const { name, branch } = req.body;
    let id = 0;
    
    if ( !name || !branch) {
        if(!name){
            return res.status(400).send("Please provide name")
        }
        else{
            return res.status(400).send("please provide branch")
        }

    }

    const existStudent = students.find(s => s.id == id);

    if (existStudent) {
        return res.status(409).send(`Student with ID ${id} already exists`)
    }
    const newStudent = { id: students.length + 1, 
        name, branch };
    students.push(newStudent);

    fs.writeFile("/students.json", JSON.stringify(students, null, 2), (err) => {
        if (err) {
            return res.status(500).send("Error saving student data");
        }
    });
    
    res.json(students);

})


app.listen(PORT,()=>{
    console.log(`Server is Running on port:${PORT}`)
})