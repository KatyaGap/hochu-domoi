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
        <Route path="/lost-map" element={<Maps filter="lost" />} />
        <Route path="/found-map" element={<Maps filter="found" />} />
        <Route path="/pet" element={<Pet />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/authnewpost" element={<Auth isNewPost />} />

        {/* <Route path="/addlabel" element={<AddLabel />} /> */}
        <Route path="/newpost" element={<Form />} />
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
