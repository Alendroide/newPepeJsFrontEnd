import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute"
import Home from "./pages/Home/Home"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
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
