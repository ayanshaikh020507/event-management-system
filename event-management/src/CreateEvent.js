import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [Title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Category, setCategory] = useState("")
  const [Date, setDate] = useState("")
  const [Time, setTime] = useState("")
  const [Venue, setVenue] = useState("")
  const [Organizer, setOrganizer] = useState("")
  const navigate = useNavigate()

  const SubmitEvent = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/CreateEvent", {
      Title,
      Description,
      Category,
      Date,
      Time,
      Venue,
      Organizer
    })
    .then(result => {
      console.log(result)
      navigate("/")
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="container">
        <form onSubmit={SubmitEvent}>
          <h2>Create Event</h2>
          <br/>
          <div className="form-group">
            <label htmlFor="eventTitle">Event Title</label>
            <input type="text" className="form-control" placeholder="Enter event title" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" placeholder="Enter event description" onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" className="form-control" placeholder="Enter event category" onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input type="time" className="form-control" onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input type="text" className="form-control" placeholder="Enter event venue" onChange={(e) => setVenue(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="organizer">Organizer</label>
            <input type="text" className="form-control" placeholder="Enter organizer name" onChange={(e) => setOrganizer(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;