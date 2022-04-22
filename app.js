import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();

app.use(cors());
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    const userAlreadyExist = users.find((user) => user.username === username);

    if (username && avatar) {
        if (userAlreadyExist) {
            res.status(201).send("OK");
        } else {
            users.push({
                username: username,
                avatar: avatar
            });
            res.status(201).send("OK");
        }
    } else {
        res.status(400).send("Todos os campos são obrigatórios!");
    }
});

app.post("/tweets", (req, res) => {
    const { username, tweet, avatar } = req.body;

    if (username && tweet) {
        tweets.push({
            username: username,
            tweet: tweet,
            avatar: avatar
        });
        res.status(201).send("OK");
    } else {
        res.status(400).send("Todos os campos são obrigatórios!");
    }
});

app.get("/tweets", (req, res) => {
    const newTenTweets = tweets.slice(-10).reverse();
    res.status(200).send(newTenTweets);
});

app.listen(5000, () => {
    console.log(chalk.bold.green(`Application working at http://localhost:5000`))
});