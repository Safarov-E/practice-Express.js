const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const homeRouters = require('./routes/home');
const cardRouters = require('./routes/card');
const addRouters = require('./routes/add');
const coursesRouters = require('./routes/courses');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRouters)
app.use('/add', addRouters)
app.use('/courses', coursesRouters)
app.use('/card', cardRouters)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = 'mongodb+srv://MongoDB:4m6TcI6fug9di9RI@cluster0-9izij.mongodb.net/test?retryWrites=true&w=majority'
        await mongoose.connect(url, {useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch(e) {
        console.log(e)
    }
}
start();