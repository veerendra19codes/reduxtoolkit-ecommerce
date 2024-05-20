import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from './components/Headers';
import Home from './components/Home';
import CartDetails from './components/CartDetails';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Router>
    <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartDetails />} />
      </Routes>
    </Router>
    <Toaster/>
    </>
  );
}

export default App;
