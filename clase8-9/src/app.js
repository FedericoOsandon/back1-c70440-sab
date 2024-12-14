const express = require('express')

const productRouter = require('./routes/products.router.js')
const viewsRouter = require('./routes/views.router.js')
const logger = require('morgan')
const { uploader } = require('./utils/multer.js')
const handlebars = require('express-handlebars')


const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use('/static',express.static(__dirname + 'public'))
app.use(express.static('public'))
app.use(logger('dev'))


// configuración motor de plantilla
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')


const middleware = function (req, res, next){
  console.log('Time: ', Date.now() )
  req.username = 'fede'
  next()
}

app.use(middleware)

app.post('/subirarchivo', uploader.single('myFile'), (req, res) => { //myFile nombre del input 
  
  res.send('archivo subido')
})

app.use('/', viewsRouter)
// http://localhost:8080 + /api/products
app.use('/api/products', productRouter)

app.use((err, req, res, next)=>{
  console.log(err.stack)
  res.status(500).send('error de server')
})



// http://localhost:8080 + /api/products
// app.get('/api/carts', (req,) => {
//     res.send('get carts')
// })
// app.post('/api/carts', (req,) => {
//     res.send('create carts')
// })
// app.put('/api/carts', (req,) => {
//     res.send('update carts')
// })
// app.delete('/api/carts', (req,) => {
//     res.send('delete carts')
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// fork conflicto con watch 
// async await -> promesa -> s s