const { Router } = require('express')

const router = Router()

// callback -> controllador -> lógica
router.get('/', (req, res) => {

    const user = {
        name: 'Fede',
        last_name: 'Osandón',
        role: 'user'
    }

    const products = [
        {title: 'producto 1', price: 5000},
        {title: 'producto 2', price: 6000},
        {title: 'producto 3', price: 7000},
        {title: 'producto 4', price: 8000},
        {title: 'producto 5', price: 9000},
    ]

    res.render('index', {
        user,
        products,
        isAdmin: user.role === 'admin',
        hayProductos: products.length !== 0,
        title: 'PRODUCT',
        style: 'styles.css'
    }
        
    )

    
})

module.exports = router