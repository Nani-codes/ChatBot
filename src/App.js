import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Sample from './pages/Sample'
import Llama from './pages/Llama'
import Another from './pages/Another'
import Mistral from './pages/Mistral'
import Navbar from './components/Navbar'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/mistral" element={<Mistral/>}/>
          <Route path="/Llama" element={<Llama/>}/>
          <Route path="/Another" element={<Another/>}/>
          <Route path="/sample" element={<Sample/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
