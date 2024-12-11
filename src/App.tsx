import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute"
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        {/*Ruta de inicio*/}
        <Route path="/"  element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}
export default App
