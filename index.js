const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next)=>{
    try{
        const user = await User.findById('6437e59a908f46fd35baa564')
        req.user = user
        next()
    }
    catch (err){
        console.log(err)
    }
})

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = `mongodb+srv://pavelmail07:IxQhklVEuuIn2YQr@cluster0.2awc9ux.mongodb.net/shop`

        await mongoose.connect(url, {
            useNewUrlParser: true
        })


        const candidate = await User.findOne()

        if(!candidate){
            const user = new User({
                email: 'pavelmail07@gmail.com',
                name: 'Pavel',
                cart: {items: []}
            })

            await user.save()
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    } catch (e) {
        console.log(e)
    }
}

start()