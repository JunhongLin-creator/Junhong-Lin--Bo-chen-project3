const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const cors = require('cors')
// init the app
const app = express()


app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json())


// connect to mongodb
//mongoose.connect('mongodb+srv://chenbonick:Nick123456789@cluster0.gkbbl.mongodb.net/job-board')
//mongoose.Promise = global.Promise
const mongoString = 'mongodb+srv://chenbonick:Nick123456789@cluster0.gkbbl.mongodb.net/job-board'
mongoose.connect(mongoString, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

// session
app.use(session({
    secret: "SUPER_SECRET",
    store: MongoStore.create({ mongoUrl: mongoString }),
    resave: true,
    saveUninitialized: true
}));






// init routes
app.use('/job', require('./routes/job'))
app.use('/user', require('./routes/user'))






// Error handling
app.use(function (err, req, res, next) {
    res.status(422).send({error: err.message})
})

app.listen(process.env.port || 4000, function () {
    console.log('ready for accept request')
})
