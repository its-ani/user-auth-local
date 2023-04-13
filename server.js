const express = require('express')
const session = require('express-session')


const {db} = require('./db')

const app = express()

app.set('view engine', 'hbs')

app.use(session({
    resave:true,
    saveUninitialized: true,
    secret: 'sdjdijwniuwqiuher2332'
}))

app.get('/signup', (req,res)=>{
    res.render('signup')
})

db.sync()
.then(()=>{
    app.listen(2222, ()=> console.log("started on http://localhost:2222"))
})
.catch(console.error)