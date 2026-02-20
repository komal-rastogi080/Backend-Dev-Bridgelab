const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function readStudents() {
    return JSON.parse(fs.readFileSync("./db.json", "utf-8") || "[]");
}

function writeStudents(students){
    fs.writeFileSync("./db.json", JSON.stringify(students, null, 2));
}

app.get("/", (req, res) => {
    res.render("student");
});

app.post("/add-student", (req,res) => {
    const students = readStudents();
    const {name, age, branch} = req.body;
    const id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    const newStudent = {
        id,
        name,
        age,
        branch
    };
    students.push(newStudent);
    writeStudents(students);
    res.redirect("/student");
    }
);

app.get("/student", (req,res) => {
    const students = readStudents();
    const branch = req.query.branch;

    if(branch){
        students = students.filter(s => s.branch.toLowerCase() === branch.toLowerCase());
    }

    res.render("student", {
        students, 
        total: students.length,
        branch: branch || "All Branches"
    })
});

app.get("/student/delete/:id", (req,res) => {
    const students = readStudents();
    students = students.filter(s => s.id !== parseInt(req.params.id));
    writeStudents(students);
    res.redirect("/student");
})
app.post("/student", (req, res) => {
    const { name, age, grade } = req.body;
    res.send(`
        <h2>Student Info Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <a href="/student">Go Back</a>
    `);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
