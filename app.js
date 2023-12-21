//Todo 新增一家餐廳 POST restaurants/new
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

//首頁顯示餐廳清單
app.get('/', (req, res) => {
  Restaurant.findAll({ attribute: ['id', 'name'], raw: true }).then(
    (Restaurant) => {
      res.render('index', { Restaurant })
    }
  )
})

app.get('/restaurants/:id', (req, res) => {
  res.sned(`get ${{ id }} detail`)
})

app.post('/restaurants/new', (req, res) => {
  res.sned('add new restaurant')
})

app.put('/restaurants/:id/edit', (req, res) => {
  res.send('modify restaurant')
})

app.delete('/restaurants/:id', (req, res) => {
  res.send(`delete ${{ id }}`)
})

app.listen(port, () => {
  console.log(`APP is running on http://127.0.0.1:${port}`)
})
