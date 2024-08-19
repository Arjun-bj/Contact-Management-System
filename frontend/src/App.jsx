
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer} from "react-toastify"
import './App.css'
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.css'; 
function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
