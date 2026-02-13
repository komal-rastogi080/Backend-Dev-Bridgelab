const fs = require("fs").promises;
const express = require("express");
const app = express();

app.use(express.json()) //in-built middleware to parse JSON bodies

const PORT= 8000;
app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});

const students = [
    {
        id: 1,
        name: "John Doe",
        age: 20,
        branch: "Computer Science",
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 22,
        branch: "Mechanical Engineering",
    },
    {
        id: 3,
        name: "Alice Johnson",
        age: 19,
        branch: "Electrical Engineering",
    },
]
//GLOBAL MIDDLEWARE
// app.use((req,res,next)=>{
//     console.log("This is middleware !!!");
//     next()
// });

// app.use((req,res,next)=>{
//     console.log("This is another middleware !!!");
//     next()
// });

//custom middleware
const loggerFile = (req, res, next) => {
    const log = `Request at: ${new Date().toLocaleString()} method: ${req.method}`;
    fs.appendFile("./log.text", 'utf-8', (err) => {
        if (err) {
            console.error(err);
        }
    });
next();
}
const readStudentsFromFile = async () => {
  try{
    const data = await fs.readFile("./students.json", "utf-8");
    return JSON.parse(data || "[]");
  }
  catch(e){
    console.error("Error reading students file:", e);
    return [];
  }
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
};

app.get("/students", loggerFile, async(req, res) => {
    const students= await readStudentsFromFile();
    return res.status(200).json(students);
})


app.put("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty body not allowed" });
    }

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    existingStudents[foundIndex] = {
      ...existingStudents[foundIndex],
      ...req.body,
    };

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Updated Successfully",
      student: existingStudents[foundIndex],
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

app.post("/students", async (req,res) =>{
    try{
        const newStudent = req.body;
        if(newStudent.id==undefined || newStudent.name==undefined || newStudent.age==undefined){
            return res.status(400).json({message:"Invalid student data"})
        }
    }
})

app.delete("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    const deletedStudent = existingStudents.splice(foundIndex, 1);

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent: deletedStudent[0],
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});