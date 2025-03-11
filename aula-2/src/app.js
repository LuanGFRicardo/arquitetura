import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import post from "./models/Post.js";

const app = express();
app.use(express.json());

const connection = await connectToDatabase();

connection.on("error", (error) => {
    console.error("Erro de conexão", error);
});

connection.once("open", () => {
    console.log("Conexão com o banco realizada com sucesso!");
});

const posts = [
    {
        id: 1,
        title: "Aula 1",
        description: "Descrição aula 1",
        author: "Faluno"
    }, {
        id: 2,
        title: "Aula 2",
        description: "Descrição aula 2",
        author: "Beltrano"
    }, {
        id: 3,
        title: "Aula 3",
        description: "Descrição aula 3",
        author: "Siclano"
    }
]

function searchPost(id) {
    return posts.findIndex(posts => {
        return posts.id === Number(id);
    });
}

app.get("/", (req, res) => {
    res.status(200).send("API com Node e Express.js");
});

// app.get("/posts", async (req, res) => {
//     const listPosts = await post.find({});
//     res.status(200).json(posts);
// });

app.get("/posts/:id", (req, res) => {
    const index = searchPost(req.params.id);
    res.status(200).json(posts[index]);
});

app.post("/posts", (req, res) => {
    posts.push(req.body);
    res.status(201).send("Post criado com sucesso!");
});

app.put("/posts/:id", (req, res) => {
    const index = searchPost(req.params.id);
    posts[index].title = req.body.title;
    posts[index].description = req.body.description;
    posts[index].author = req.body.author;
    res.status(200).json(posts[index]);
});

app.delete("/posts/:id", (req, res) => {
    const index = searchPost(req.params.id);
    posts.splice(index, 1);
    res.status(200).send("Post removido com sucesso!");
});

export default app;
