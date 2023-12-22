//Todo 新增一家餐廳 POST restaurants/add
//Todo 餐廳的詳細資訊 GET restaurants/:id
//Todo 瀏覽全部所有餐廳 GET restaurants
//Todo 修改一家餐廳的資訊 PUT restaurants/:id/edit
//Todo 刪除一家餐廳 DELETE restaurants/:id

const express = require('express')
const app = express()
const methodOverride = require('method-override')
const port = 3000
const { engine } = require('express-handlebars')

const db = require('./models')
const Restaurant = db.Result

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
//設置 express.urlencoded
app.use(express.urlencoded({ extended: true }))
//設定methodOverride
app.use(methodOverride('_method'))

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

app.post('/restaurants', (req, res) => {
  // 確保 req.body 是一個對象或者陣列
  const data = req.body

  // 如果 data 是一個對象，轉換它為一個陣列
  const entries = Array.isArray(data) ? data : [data]

  const add_data = entries.map((item) => ({
    ...item,
    createdAt: new Date(), // 設置當前時間為 createdAt
    updatedAt: new Date(), // 設置當前時間為 updatedAt
  }))

  console.log(add_data)
  Restaurant.bulkCreate(add_data)
    .then(() => {
      // 當數據成功新增後，發送一個成功響應或重定向
      res.status(201).send('新增餐廳成功')
    })
    .catch((err) => {
      // 如果有錯誤發生，記錄錯誤並發送錯誤響應
      console.error('新增餐廳過程中發生錯誤:', err)
      res.status(500).send('新增餐廳過程中發生錯誤')
    })
})

app.listen(port, () => {
  console.log(`APP is running on http://127.0.0.1:${port}`)
})
