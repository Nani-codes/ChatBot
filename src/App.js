import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Sample from './pages/Sample'
import Navbar from './components/Navbar'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/sample" element={<Sample/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
