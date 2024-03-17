import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import ForgotPass from './Components/ForgotPass';
import Auth from './Components/Auth';
import Homepage from './Components/Homepage';
import Cart from './Components/Cart';
import Orders from './Components/Orders';




function App() {
  return (
    <BrowserRouter>
   
    <Routes>
     
      <Route path='/' element={<Auth />} />
      <Route path='/home' element={<Homepage />} />
      <Route path='/Reset-Password' element={<ForgotPass />} />
      <Route path='/Cart' element={<Cart />} />
      <Route path='/orders' element={<Orders />} />

      


    </Routes>
    
    </BrowserRouter>
  );
}

export default App;