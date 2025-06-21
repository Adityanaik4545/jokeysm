const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
let selectedCategory;
app.set("view engine","ejs")
app.use(express.static("public"))
app.get('/', (req, res) => {
  res.render('index',{setup:"What kind of joke you wanna here?, let me know 😁"})
})
app.get('/any', (req, res) => {
  selectedCategory="Any"
})
app.get('/programming', async(req, res) => {
  selectedCategory="Programming"
})
app.get('/dark', async(req, res) => {
  selectedCategory="Dark"
})
app.get('/spooky', async(req, res) => {
  selectedCategory="Spooky"
})
app.get('/misc', async(req, res) => {
  selectedCategory="Misc"
})
app.get('/pun', async(req, res) => {
  selectedCategory="Pun"
})
app.get('/christmas', async(req, res) => {
  selectedCategory="Christmas"
})
app.get('/generate', async(req, res) => {
  try {
    const response= await axios.get(`https://v2.jokeapi.dev/joke/${selectedCategory}`)
    res.render('index',{setup:JSON.stringify(response.data.setup),delivery:JSON.stringify(response.data.delivery)})
  } catch (error) {
    
  }
})

app.listen(port, () => {
  console.log(` listening on port ${port}`)
})
