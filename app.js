import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();

app.use(cors());
app.use(json());

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
    const { tweet } = req.body;
    const { username } = req.headers.user;
    const findUser = users.find((user) => user.username === username);

    if (tweet) {
        tweets.push({
            username: username,
            tweet: tweet,
            avatar: findUser.avatar
        });
        res.status(201).send("OK");
    } else {
        res.status(400).send("Todos os campos são obrigatórios!");
    }
});

app.get("/tweets", (req, res) => {
    const { page } = req.query;
    const limit = 10;

    if (page > 0 && page * limit - tweets.length <= limit) {
        let tenTweets = [];

        for (let i = tweets.length - limit * (page - 1); i > tweets.length - limit - (limit * (page - 1)); i--) {
            const tweet = tweets[i];

            if (tweet) {
                tenTweets.push(tweet);
            }
        }
        res.status(200).send(tenTweets);
    } else {
        res.status(400).send('Informe uma página válida!');
    }
});

app.get('/tweets/:id', (req, res) => {
    const { id } = req.params;
    const userTweets = tweets.filter((tweet) => tweet.username === id);
    const newUserTenTweets = userTweets.slice(-10).reverse();

    res.status(200).send(newUserTenTweets);
});

app.listen(5000, () => {
    console.log(chalk.bold.green(`Server is running at http://localhost:5000`))
});