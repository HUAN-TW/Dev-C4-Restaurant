//Todo 新增一家餐廳 POST restaurants/add ✔️
//Todo 餐廳的詳細資訊 GET restaurants/:id ✔️
//Todo 瀏覽全部所有餐廳 GET restaurants ✔️
//Todo 修改一家餐廳的資訊 PUT restaurants/:id/edit ✔️
//Todo 刪除一家餐廳 DELETE restaurants/:id ✔️

//Todo 以助教來看同學有優化或特別做過什麼
//Todo 改介面、UI操作更彈性(search)、排序
//Todo 可以再建一張category表 , 如果類別少就直接寫在code裡面

const express = require('express')
const app = express()
const methodOverride = require('method-override')
const { engine } = require('express-handlebars')
const port = 3000

const db = require('./models')
const Restaurant = db.Result

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// 讓express知道有public是靜態檔案路徑
app.use(express.static('public'))

//設置 express.urlencoded
app.use(express.urlencoded({ extended: true }))
//設定methodOverride
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

//顯示餐廳清單
app.get('/restaurants', (req, res) => {
  Restaurant.findAll({ attribute: ['id', 'name'], raw: true }).then(
    (Restaurant) => {
      res.render('index', { Restaurant })
    }
  )
})

//導頁到edit
app.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id

  // 同时执行两个查询
  Promise.all([
    Restaurant.findOne({ where: { id: id }, raw: true }),
    Restaurant.findAll({ attributes: ['category'], raw: true }),
  ])
    .then((results) => {
      // results[0] 是第一个查询的结果，results[1] 是第二个查询的结果
      const restaurant = results[0]
      const categories = results[1]
      console.log(categories)

      // 将两个查询的结果一起发送到视图
      res.render('edit', { restaurant, categories })
    })
    .catch((err) => {
      // 处理任何可能出现的错误
      console.error('Error fetching data:', err)
      res.status(500).send('Server error')
    })
})
// 更新到DB功能
app.put('/restaurants/:id', (req, res) => {
  const body = req.body
  const id = req.params.id
  console.log(body)
  //update sequelize 語法 update
  return Restaurant.update(body, { where: { id } }).then(() =>
    res.redirect(`/restaurants/${id}`)
  )
})
//路由到add頁面//
app.get('/restaurants/add', (req, res) => {
  return Restaurant.findAll({ attribute: ['category'], raw: true }).then(
    (category) => {
      res.render('add', { category })
    }
  )
})
// post 新增到DB
app.post('/restaurants', (req, res) => {
  const data = req.body

  const entries = Array.isArray(data) ? data : [data]

  const add_data = entries.map((item) => ({
    ...item,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  Restaurant.bulkCreate(add_data)
    .then(() => {
      res.redirect('/restaurants')
    })
    .catch((err) => {
      console.error('新增餐廳過程中發生錯誤:', err)
      res.status(500).send('新增餐廳過程中發生錯誤')
    })
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
//刪除
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  //destory sequelize 語法 delete
  return Restaurant.destroy({ where: { id } }).then(() =>
    res.redirect('/restaurants')
  )
})

app.listen(port, () => {
  console.log(`APP is running on http://127.0.0.1:${port}`)
})
