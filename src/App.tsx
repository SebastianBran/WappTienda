import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/home'
import CreateStore from './views/createStore'
import Admin from './views/admin'
import Storefront from './views/storefront'
import LoginPage from './views/login'
import RegisterPage from './views/register'
import CheckoutPage from './views/checkout'
import Dashboard from './views/admin/views/dashboard'
import Orders from './views/admin/views/orders'
import OrderDetail from './views/admin/views/orders/views/detail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-store" element={<CreateStore />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders">
            <Route index element={<Orders />} />
            <Route path=":orderId/detail" element={<OrderDetail />} />
          </Route>
        </Route>
        <Route path="/store/:storeName" element={<Storefront />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
