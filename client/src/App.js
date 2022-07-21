import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import Navbar from './components/elements/Navbar';
import Main from './components/Main';
import Auth from './components/Auth';
import Maps from './components/Maps';
import Pet from './components/Pet';
import Newpost from './components/Newpost';
import Catalog from './components/Catalog';
import Profile from './components/Profile';
import Favor from './components/Favor';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/lost" element={<Maps filter="lost" />} />
        <Route path="/found" element={<Maps filter="found" />} />
        <Route path="/pet/:id" element={<Pet />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/authnewpost" element={<Auth isNewPost />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/newpost" element={<Newpost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/favor" element={<Favor />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <div className="toastify">
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
