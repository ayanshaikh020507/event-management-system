import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateEvent() {
  const {id} = useParams()
  const [Title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Category, setCategory] = useState("")
  const [Date, setDate] = useState("")
  const [Time, setTime] = useState("")
  const [Venue, setVenue] = useState("")
  const [Organizer, setOrganizer] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/getEvent/" + id)
    .then(result => {console.log(result)
      setTitle(result.data.Title)
      setDescription(result.data.Description)
      setCategory(result.data.Category)
      setDate(result.data.Date)
      setTime(result.data.Time)
      setVenue(result.data.Venue)
      setOrganizer(result.data.Organizer)
    })
    .catch(err => console.log(err))
  }, [])

  const update = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/UpdateEvent/" + id, {
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
        <form onSubmit={update}>
          <h2>Update Event</h2>
          <br/>
          <div className="form-group">
            <label htmlFor="eventTitle">Event Title</label>
            <input type="text" className="form-control" placeholder="Enter event title" value={Title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" placeholder="Enter event description" value={Description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" className="form-control" placeholder="Enter event category" value={Category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" className="form-control" value={Date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input type="time" className="form-control" value={Time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input type="text" className="form-control" placeholder="Enter event venue" value={Venue} onChange={(e) => setVenue(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="organizer">Organizer</label>
            <input type="text" className="form-control" placeholder="Enter organizer name" value={Organizer} onChange={(e) => setOrganizer(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Update Event</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEvent;