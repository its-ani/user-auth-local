const express = require('express')
const session = require('express-session')


const {db, Users} = require('./db')

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'hbs')

app.use(session({
    resave:true,
    saveUninitialized: true,
    secret: 'sdjdijwniuwqiuher2332',
    // cookie : {

    // }
}))

app.get('/signup', (req,res)=>{
    res.status(200).render('signup')
})

app.post('/signup', async (req,res)=>{
    const user = await Users.create({
        username : req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    res.status(201).send(`User ${user.id} created`)
})

app.get('/login', (req,res)=>{
    res.status(200).render('login')
})

app.post('/login', async (req,res)=>{
    const user = await Users.findOne({where:{username: req.body.username}})
    if(!user){
        return res.status(404).render('login', {error: 'No username found'})
    }
    if(user.password != req.body.password){
        return res.status(401).render('login', {error: 'Incorrect Password'})
    }
    req.session.userId = user.id
    res.redirect('/profile')

})

app.get('/profile', async (req,res)=>{
    if(!req.session.userId){
        return res.redirect('/login')
    }
    const user = await Users.findByPk(req.session.userId)
    res.status(200).render('profile', { user })
})

app.get('/logout', (req,res)=>{
    req.session.userId = null
    req.session.destroy() //it will destroy cookies
    res.redirect('/login')
})

db.sync()
.then(()=>{
    app.listen(2222, ()=> console.log("started on http://localhost:2222"))
})
.catch(console.error)