const express = require('express')
const app = express()
const ejs = require("ejs");
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/index.ejs')
})
app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index', { foo: 'FOO' });
});