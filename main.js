const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')

app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mst', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mst')

let todos = []
let i = 1
let done = []

app.get('/', (req, res) => {
  res.render('home', { todos: todos, done: done })
})

app.post('/', (req, res) => {
  todos.push({ name: req.body.todo, id: i })
  i++
  res.redirect('/')
})

app.post('/complete', (req, res) => {
  let item = todos.find(todo => {
    return req.body.id == todo.id
  })
  done.push(item)
  let doneitem = todos.indexOf(item)
  todos.splice(doneitem, 1)
  res.json()
})

app.listen(3000, () => {
  console.log('Hello on 3000')
})
