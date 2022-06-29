require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

//middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8012;
app.listen(port, ()=> console.log('Listening to port ${port}'))
