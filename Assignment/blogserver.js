const http = require("http");
const fs = require("fs").promises;
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.set("view engine", "ejs");
//app.set("views", "./Assignment/views");

let posts=[];

const readposts = async () => {
    try {
        const data = await fs.readFile("./post.json", "utf-8");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
  };

const writeposts = async (data) => {
    await fs.writeFile("./post.json", JSON.stringify(data, null, 2));
  };
(async () => {
    posts = await readposts();
})();

app.get("/blog", (req,res)=>{
    res.render("blog-list", { posts });
});

app.get("/blog/new" , (req,res)=>{
    res.render("blog-form");
})
app.get("/blog/:id", (req,res)=>{
    const { id } = req.params;
    const post = posts.find((p) => p.id === parseInt(id));
    if (post) {
        res.render("blog-post", { post });
    } else {
        res.status(404).render("404errorform");
    }
});

app.post ("/blog", async (req,res)=>{
    const  { title , author , content } = req.body;
    if (!title || !author || !content) {
        return res.status(400).json({ message: "Title, author, and content are required" });
    }
    const newpost = {
        id: posts.length>0?Math.max(...posts.map(p=>p.id))+1:1,
        title,
        author,
        content,
        date: new Date().toLocaleDateString()
    };
    posts.push(newpost);
    await writeposts(posts);
    res.redirect("/blog");
})
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})