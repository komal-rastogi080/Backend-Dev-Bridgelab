const http = require("http");
const fs = require("fs").promises;
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.set("view engine", "ejs");
app.use("/assets", express.static("asset"));

const readfile = async () => {
  const data = await fs.readFile("./db.json", "utf-8");
  return JSON.parse(data);
};

const writefile = async (data) => {
  await fs.writeFile("./db.json", JSON.stringify(data));
};
let users = [];
(async () => {
  users = await readfile();
})();

app.get("/", async (req, res) => {
  res.send("Welcome to the User API");
});
app.get("/contact", (req, res) => {
  res.render("contactForm", { users });
});
app.get("/submitted-data", async (req, res) => {
  res.json(users);
});
app.get("/users", async (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
app.post("/submit", async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ message: "ID and name are required" });
  }
  const newUser = { id, name };
  users.push(newUser);
  await writefile(users);
  res.status(201).json(newUser);
});

app.get("/gallery", (req, res) => {
  const images = [
    { filename: "1.png", title: "Image 1" },
    { filename: "2.png", title: "Image 2" },
    { filename: "3.png", title: "Image 3" },
  ];
  res.render("gallary", { images });
});

app.listen(PORT, () => {
  // 404 handler - must be last, after all routes
  app.use((req, res) => {
    res.status(404).render("404errorform");
  });
  console.log(`Server is running on port http://localhost:${PORT}`);
});
