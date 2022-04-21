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

app.post('/sign-up', (req, res) => {
    const { username, picture } = req.body;

    users.push({
        username: username,
        picture: picture
    });

    res.send(console.log("OK"));
});

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;

    tweets.push({
        username: username,
        tweet: tweet
    });

    res.send(console.log("OK"));
});

app.get('/tweets', (req, res) => {
    
    tweets.forEach((tweet, index) => {
        if(index >= tweets.length-10)
        res.send(tweet);
    })
});

app.listen(5000, () => { console.log(chalk.bold.green(`Application working at http://localhost:5000`)) });