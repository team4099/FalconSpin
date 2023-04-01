import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Motors from './pages/Motors'

export default function App() {
  const tailwind = require("./tailwind.js");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Motors />} />
      </Routes>
    </Router>
  );
}
