import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Auth from './components/Auth';
import Map from './components/Map';
import AddLabel from './components/AddLabel';

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
        <Route path="/addlabel" element={<AddLabel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default App;
