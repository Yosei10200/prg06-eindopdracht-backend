import express from 'express';
import mongoose from "mongoose";
import prefectures from "./routes/prefectures.js";

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/prg06-webservice');

app.use((req, res, next) => { if (req.method === "OPTIONS") {

    if (req.originalUrl === '/prefectures') {
        res.setHeader('Allow', 'GET, POST, OPTIONS');
    } else if (req.originalUrl.startsWith('/prefectures/')) {
        res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    return res.status(204).end();
}

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

    next();
});


app.use((req, res, next) => {
    const acceptHeader = req.headers['accept'];

    console.log(`Client accepteert: ${acceptHeader}`);
    if (acceptHeader.includes('application/json')) {
    } else {
        return res.status(406).json({error: 'error'})
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/prefectures', prefectures)

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});



