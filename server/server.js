const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

app.use(cookieParser());

const cors = require('cors');
app.use(cors({origin:"http://localhost:3000", credentials:true}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./config/mongoose.config');
require('./routes/routes')(app);

app.listen(port, ()=> console.log(`Listening on port: ${port}`));