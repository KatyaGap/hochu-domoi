import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Auth from './components/Auth';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/lost-map" element={<Map filter="lost" />} />
        <Route path="/found-map" element={<Map filter="found" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/authnewpost" element={<Auth isNewPost />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
