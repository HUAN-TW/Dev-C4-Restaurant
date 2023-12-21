//Todo 新增一家餐廳 POST restaurants/add
//Todo 餐廳的詳細資訊 GET restaurants/:id
//Todo 瀏覽全部所有餐廳 GET restaurants
//Todo 修改一家餐廳的資訊 PUT restaurants/:id/edit
//Todo 刪除一家餐廳 DELETE restaurants/:id

const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')

const db = require('./models')
const Restaurant = db.Result

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.redirect('/restaurant')
})

//顯示餐廳清單
app.get('/restaurant', (req, res) => {
  Restaurant.findAll({ attribute: ['id', 'name'], raw: true }).then(
    (Restaurant) => {
      res.render('index', { Restaurant })
    }
  )
})

app.get('/restaurants/add', (req, res) => {
  return Restaurant.findAll({ attribute: ['category'], raw: true }).then(
    (category) => {
      res.render('add', { category })
    }
  )
})

//顯示restaurant detail
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ where: { id: id }, raw: true }).then(
    (Restaurant) => {
      res.render('show', { Restaurant })
    }
  )
})

app.listen(port, () => {
  console.log(`APP is running on http://127.0.0.1:${port}`)
})
