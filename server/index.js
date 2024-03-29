import express from 'express';
// import WebSocket from 'ws';
import expressWs from 'express-ws'
// import bodyParser from 'body-parser';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();


// Mongoose Setup
import mongoose from 'mongoose';

// const post_model = require('./models/postMessage.js');

// const CONNECTION_URL = "mongodb+srv://RentMyBook:rmb%40kay+rdj@main.bn0ad.mongodb.net/Books?retryWrites=true&w=majority";
const CONNECTION_URL = process.env.MONGODB_API_URL; /* Retryable writes allows MongoDB drivers to automatically retry certain write operations a single time if they encounter network errors, or if they cannot find a healthy primary in the replica sets or sharded cluster.

Write concern describes the level of acknowledgment requested from MongoDB for write operations to a standalone mongod or to replica sets or to sharded clusters. In sharded clusters, mongos instances will pass the write concern on to the shards. ( if your replica set has 3 members that mean that your majority=2 , meaning that your write operation will receive acknowledgment after it receive success confirmation from at least 2 members) */

const MONGODB_LOCALHOST = process.env.MONGODB_API_URL_LOCAL;

mongoose.connect(MONGODB_LOCALHOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log("database connected");})
.catch((error) => {console.log(error.message);})
// Mongoose Setup


import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comment.js';
import searchRoutes from './routes/search.js';
import followRoutes from './routes/follow.js';
import topRoutes from './routes/top.js';

const server = express();
const PORT = process.env.PORT || 5000; //env if heroku, it'll populate it automatically...
expressWs(server) // to enable the server to use websockets

// server.use(express.urlencoded())

server.use(cors())

server.use(express.json({limit: '550mb'})); // prev 50mb
server.use(express.urlencoded({limit: '550mb'}));

server.use('/auth', authRoutes);
server.use('/posts', postRoutes);
server.use('/comment', commentRoutes);
server.use('/search', searchRoutes);
server.use('/follow', followRoutes);
server.use('/top', topRoutes);

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}/`);
})


// server.get("/", (req, res) => {
//     server.use(express.static(path.resolve(__dirname,'client','build')))
//     res.sendFile(path.resolve(__dirname,'client','build','index.html'))
// })
