import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute"
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register"
import Post from './pages/Post/Post'
import User from './pages/User/User'
import './css/App.css'
function App() {
  return (
    <Router>
      <Routes>
        
        {/*Inicio de sesión y registro*/}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/*Ruta de inicio*/}
        <Route path="/"  element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        } />

        {/*Posts*/}
        <Route path="/post/:id"  element={
          <ProtectedRoute>
            <Post/>
          </ProtectedRoute>
        } />

        {/*User*/}
        <Route path="/user/:id" element={
          <ProtectedRoute>
            <User/>
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  )
}
export default App
