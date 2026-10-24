const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    Category: String,
    Date: String,
    Time: String,
    Venue: String,
    Organizer: String
})

const Event = mongoose.model('Events', EventSchema)
module.exports = Event