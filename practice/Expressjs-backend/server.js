const express = require("express");
const fs = require("fs");
  

const app = express();
app.use(express.json());
const PORT = 8001;

const readfile = () => {
  const data = fs.readFileSync("./db.json", "utf-8");
  return JSON.parse(data);
};
const writefile = (data) => {
  fs.writeFileSync("./db.json", JSON.stringify(data));
}

const students=readfile();
app.get("/", (req, res) => {
  res.send("WELCOME to HOME PAGE");
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  const newStudent = req.body;
  const studentid=newStudent.id;
  const exist=students.find((s)=>s.id===studentid);
  if(exist){
    return res.status(400).json({message:"Student with this ID already exists"})
  }
  if(newStudent.id==undefined || newStudent.name==undefined || newStudent.age==undefined){
    return res.status(400).json({message:"Invalid student data"})
  }
  students.push(newStudent);
  writefile(students);
  res.status(201).json(newStudent);
});

app.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

app.get("/search", (req, res) => {
    const branch = req.query.branch;
    const foundStudents = students.filter(student => student.branch === branch);
    res.json(foundStudents);
});
app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const foundIndex = students.findIndex((s) => s.id === studentId);
  if(foundIndex === -1){
    return res.status(404).json({message:"Student not found"})
  }

  students[foundIndex] = {...students[foundIndex], ...req.body};
  writefile(students);
  const result ={message:"Student updated successfully", student: students[foundIndex]};
  return res.status(200).json(result);
})
app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const foundIndex = students.findIndex((s) => s.id === studentId);
  if(foundIndex === -1){
    return res.status(404).json({message:"Student not found"})
  }
  students.splice(foundIndex,1);
  writefile(students);
  return res.status(200).json({message:"Student deleted successfully"});
})
app.listen(PORT, () => {
  console.log(`Server is running : http://localhost:${PORT}`);
});