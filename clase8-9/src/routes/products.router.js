const { Router } = require('express')
// import express from 'express'
const ProductManagerFile = require('../managers/productsManagerFile.js')

const router = Router()
const {
   getProducts
} = new ProductManagerFile('Products.json')


// http://localhost:8080 + /api/products + /
// router.get('/', (req, res)=> {

// })

const midd1 = function (req, res, next){
    req.username = 'Fede'

    next()
}


// http://localhost:8080 + /api/products
router.get('/', async (req, res, next) => {
    try {
        const products = await getProducts()
        res.send({
            status: 'success',
            data: products
        })        
    } catch (error) {
        next(error)
    }
})

const authentication = (req, res, next) => {
    console.log(req.username)
    if(req.username !== 'Fede') return res.send('usuario no válido')
    next()
}

router.post('/', authentication,(req, res) => {
    console.log(req.username)
    res.send('create products')
})

// http://localhost:8080 + /api/products + /:pid
router.put('/:pid', (req, res) => {
    res.send('update products')
})
router.delete('/:pid', (req, res) => {
    res.send('delete products')
})


// export default router
module.exports = router
// carts [
//     {id: '', products: []}
// ]