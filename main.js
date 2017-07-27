const express = require('express')
const mustacheExpress = require('mustache-express')

app = express()

app.use(express.static('public'))

app.engine('mst', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mst')

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000, () => {
  console.log('Hello')
})
