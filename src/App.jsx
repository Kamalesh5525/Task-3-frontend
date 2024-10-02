import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import Add from "./Pages/Add"
import View from "./Pages/View"
import './app.css'
import Login from "./Pages/Login"
import Register from "./Pages/Register"


function App() {


  return (
   <>
   <BrowserRouter>
    <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/add" element={<Add/>}></Route>
            <Route path="/view" element={<View/>}></Route>
            <Route path="/" element={<Register/>}></Route>
           
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
