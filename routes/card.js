const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.post('/add', async (req, res)=>{
    console.log(req)
    // const course = await Course.findById(req.body._id)
    // await req.user.addToCart(course)
    res.json({
        add: true
    })
    //res.redirect('/card')
})

router.get('/', async (req, res)=>{
    // const card = await Card.fetch()
    // res.render('card', {
    //     title: "Корзина",
    //     isCard: true,
    //     courses: card.courses,
    //     price: card.price
    // })

    res.json({
        test: true
    })
})

router.delete('/remove/:id', async (req, res)=>{
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)

})

module.exports = router