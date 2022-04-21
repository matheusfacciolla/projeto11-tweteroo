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

app.get('/sign-up', (req, res) => {
    const { username, picture } = req.body;

    users.push({
        username: username,
        picture: picture
    });

    res.send(console.log(`users: ${users}`));
});

app.listen(5000, () => { console.log(chalk.bold.green(`Application working at http://localhost:5000`)) });