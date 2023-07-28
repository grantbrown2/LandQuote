const express = require('express');
const app = express();

const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const port = 8000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // The uploaded files will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser());

const cors = require('cors');
app.use(cors({origin:"http://localhost:3000", credentials:true}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./config/mongoose.config');
require('./routes/routes')(app);

app.listen(port, ()=> console.log(`Listening on port: ${port}`));