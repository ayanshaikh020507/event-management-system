import React, {useState, useEffect} from "react";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/Events")
    .then(result => setEvents(result.data))
    .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/DeleteEvent/' + id)
    .then(result => {console.log(result)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/Login";
  }

return (
  <div>
    <nav className="navbar">
      <h2>Event Manager</h2>
      <div className="nav-links">
        <a href="/Login" onClick={handleLogout}>Logout</a>
      </div>
    </nav>

    <div className="container">
      <div className="page-header">
        <div>
          <h1>Events</h1>
          <p>Manage your upcoming events</p>
        </div>
        <a href="/CreateEvent" className="btn btn-primary">+ Create Event</a>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      {events.filter((event) =>
        event.Title.toLowerCase().includes(search.toLowerCase()) ||
        event.Description.toLowerCase().includes(search.toLowerCase()) ||
        event.Category.toLowerCase().includes(search.toLowerCase()) ||
        event.Date.toLowerCase().includes(search.toLowerCase()) ||
        event.Time.toLowerCase().includes(search.toLowerCase()) ||
        event.Venue.toLowerCase().includes(search.toLowerCase()) ||
        event.Organizer.toLowerCase().includes(search.toLowerCase())
      ).length === 0 ? (
        <div className="empty-state">
          <h2>No Events Found</h2>
          <p>{search ? "No events match your search." : "Create your first event to get started."}</p>
          {!search && (
            <a href="/CreateEvent" className="btn btn-primary">Create Event</a>
          )}
        </div>
      ) : (
        <div className="event-grid">
          {events
            .filter((event) =>
              event.Title.toLowerCase().includes(search.toLowerCase()) ||
              event.Description.toLowerCase().includes(search.toLowerCase()) ||
              event.Category.toLowerCase().includes(search.toLowerCase()) ||
              event.Date.toLowerCase().includes(search.toLowerCase()) ||
              event.Time.toLowerCase().includes(search.toLowerCase()) ||
              event.Venue.toLowerCase().includes(search.toLowerCase()) ||
              event.Organizer.toLowerCase().includes(search.toLowerCase())
            )
            .map((event) => (
              <div className="event-card" key={event._id}>
                <span className="category">{event.Category}</span>
                <h3>{event.Title}</h3>
                <p className="description">{event.Description}</p>
                <div className="event-info">
                  <p>📅 <strong>Date:</strong> {event.Date}</p>
                  <p>🕐 <strong>Time:</strong> {event.Time}</p>
                  <p>📍 <strong>Venue:</strong> {event.Venue}</p>
                  <p>👤 <strong>Organizer:</strong> {event.Organizer}</p>
                </div>
                <div className="card-buttons">
                  <a href={`/UpdateEvent/${event._id}`} className="btn btn-primary">Update</a>
                  <button onClick={() => {if(window.confirm("Are you sure you want to delete this event?")) {handleDelete(event._id);}}} className="btn btn-danger">Delete</button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  </div>
);}

export default Events;