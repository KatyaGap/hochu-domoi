import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Auth from './components/Auth';
import Maps from './components/Maps';
import AddLabel from './components/AddLabel';
import Pet from './components/Pet';
import Chat from './components/Chat';
import Newpost from './components/Newpost';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/lost" element={<Maps />} />
        <Route path="/found" element={<Maps />} />
        <Route path="/pet" element={<Pet />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/authnewpost" element={<Auth isNewPost />} />

        {/* <Route path="/addlabel" element={<AddLabel />} /> */}
        <Route path="/newpost" element={<Newpost />} />
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
      {/* <div id="map" style={{ width: "600px", height: "400px" }} /> */}

    </div>
  );
}

export default App;
