const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

app = express()

let i = 1

app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mst', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mst')

app.get('/', (req, res) => {
  if (!req.session.todos) {
    req.session.todos = []
  }
  if (!req.session.done) {
    req.session.done = []
  }
  res.render('home', { todos: req.session.todos, done: req.session.done })
})

app.post('/', (req, res) => {
  todos = req.session.todos
  todos.push({ name: req.body.todo, id: i })
  i++
  req.session.todos = todos
  res.redirect('/')
})

app.post('/complete', (req, res) => {
  todos = req.session.todos
  done = req.session.done
  let item = todos.find(todo => {
    return req.body.id == todo.id
  })
  let doneitem = todos.indexOf(item)
  todos.splice(doneitem, 1)
  done.push(item)
  req.session.done = done
  req.session.todos = todos
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Hello on 3000')
})
