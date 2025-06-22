const express = require('express')
// used axios module to send req to external api
const axios = require('axios')
const app = express()
const port = 3000
app.set("view engine", "ejs")
app.use(express.static("public"))
// route for home page
app.get('/', (req, res) => {
  res.render('index', { setup: "What kind of joke you wanna here?, let me know 😁" })
})
// this route handles fetching jokes from api
app.get('/generate', async (req, res) => {
  try {
    let joke = null
    let setup = null
    let delivery = null
    const category = req.query.category
    const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`)
    const type = response.data.type
    // this if loop checks wether the joke is single or has two part
    if (response.data.type == 'single') {
      joke = response.data.joke
    } else {
      setup = response.data.setup
      delivery = response.data.delivery
    }
    res.render('index', { joke, setup, delivery })
  } catch (error) {
    console.log('unable to fetch joke due to this error:', error.message);
    res.render('index', { joke: 'Oops!, i think you have not choosen the category🤔', setup: null, delivery: null })

  }
})
// starts the server
app.listen(port, () => {
  console.log(` listening on port ${port}`)
})
