import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Events from './Events';
import CreateEvents from './CreateEvent';
import UpdateEvents from './UpdateEvent';
import Login from './login';

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
        <Routes>
          <Route path="/Login" element={<Login />} /> 
          <Route path="/" element={isLoggedIn ? <Events /> : <Navigate to="/Login" />} />
          <Route path="/CreateEvent" element={isLoggedIn ? <CreateEvents /> : <Navigate to="/Login" />} />
          <Route path="/UpdateEvent/:id" element={isLoggedIn ? <UpdateEvents /> : <Navigate to="/Login" />} />
        </Routes>
    </Router>
  );
}

export default App;
