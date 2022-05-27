const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    const allLogs = [];
    const now = new Date().toString();
    const reqLog = () => {
        reqlog2 = now + " --" + " Method: "+req.method + " & Path: " + req.path
        return reqlog2;
    }
    const newLog = {
        log: reqLog()
    }
    allLogs.push(newLog);
    fs.appendFile('server.log', JSON.stringify(allLogs) + "\n", (err) => {
        if(err){
            console.log(err);
        }
    })
    next();
})

app.use((req, res, next) => {
    res.render('maintenance.hbs',{
        pageTitle: "We'll be right back!",
        welcomeMessage: "Sorry the site is undergoing it's system maintenance"
    })
})

hbs.registerHelper('getcurrentYear', () => {
    return new Date().getFullYear(); 
})
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home page',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to do something something'
    })
})
app.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
});