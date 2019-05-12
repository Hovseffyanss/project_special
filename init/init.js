require('dotenv').config({path: './env/.env'});

console.log("path")

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// console.log('connecting to path => ' + process.env.db_path);
// mongoose.connect(process.env.db_path);

console.log('connecting to path => ' + "mongodb://localhost:27017/project_special");
mongoose.connect("mongodb://localhost:27017/project_special");
