const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EventModel = require('./models/Events')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/EventManagement")

app.get("/Events", (req, res) => {
    EventModel.find({})
    .then(events => res.json(events))
    .catch(err => res.json(err))
})

app.post("/CreateEvent", (req, res) => {
    EventModel.create(req.body)
    .then((events) => res.json(events))
    .catch(err => res.json(err))
})

app.get("/getEvent/:id", (req, res) => {
    const id = req.params.id;
    EventModel.findById(id)
    .then(event => res.json(event))
    .catch(err => res.json(err))
})

app.put("/UpdateEvent/:id", (req, res) => {
    const id = req.params.id;
    EventModel.findByIdAndUpdate({_id:id}, {Title: req.body.Title, Description: req.body.Description, Category: req.body.Category, Date: req.body.Date, Time: req.body.Time, Venue: req.body.Venue, Organizer: req.body.Organizer})
    .then(event => res.json(event))
    .catch(err => res.json(err))
})

app.delete("/DeleteEvent/:id", (req, res) => {
    const id = req.params.id;
    EventModel.findByIdAndDelete(id)
    .then(event => res.json(event))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})