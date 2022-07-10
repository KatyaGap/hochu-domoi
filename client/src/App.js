import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import Navbar from './components/elements/Navbar';
import Main from './components/Main';
import Auth from './components/Auth';
import Chat from './components/Chat';
import Maps from './components/Maps';
import AddLabel from './components/AddLabel';
import Pet from './components/Pet';
import Newpost from './components/Newpost';
import PostList from './components/PostList';
import Catalog from './components/Catalog';
import CardMap from './components/elements/CardMap';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/lost" element={<Maps filter="lost" />} />
        <Route path="/found" element={<Maps filter="found" />} />
        <Route path="/pet/*" element={<Pet />} />
        <Route path="/chat" element={<Newpost />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/authnewpost" element={<Auth isNewPost />} />
        <Route path="/catalog" element={<Catalog />} />
        {/* <Route path="/addlabel" element={<AddLabel />} /> */}
        <Route path="/newpost" element={<Newpost />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/cardmap" element={<CardMap />} />
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
