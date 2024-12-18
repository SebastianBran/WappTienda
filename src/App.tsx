import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/home'
import CreateStore from './views/createStore'
import Admin from './views/admin'
import Storefront from './views/storefront'
import LoginPage from './views/login'
import RegisterPage from './views/register'
import CheckoutPage from './views/checkout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-store" element={<CreateStore />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/store/:storeName" element={<Storefront />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
