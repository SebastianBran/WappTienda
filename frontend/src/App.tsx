import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./views/home";
import Admin from "./views/admin";
import Storefront from "./views/storefront";
import LoginPage from "./views/login";
import CheckoutPage from "./views/checkout";
import Dashboard from "./views/admin/views/dashboard";
import Orders from "./views/admin/views/orders";
import OrderDetail from "./views/admin/views/orders/views/detail";
import Products from "./views/admin/views/products";
import ProductDetail from "./views/admin/views/products/views/detail";
import Customers from "./views/admin/views/customers";
import CustomerDetail from "./views/admin/views/customers/views/detail";
import CustomerEdit from "./views/admin/views/customers/views/edit";
import Settings from "./views/admin/views/settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { ProductDetailWrapper } from "./views/admin/views/products/views/detail/ProductDetailWrapper";
import { OrderDetailWrapper } from "./views/admin/views/orders/views/detail/OrderDetailWrapper";
import CreateOrder from "./views/admin/views/orders/views/create";
import CreateOrderWrapper from "./views/admin/views/orders/views/create/CreateOrderWrapper";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders">
              <Route index element={<Orders />} />
              <Route
                path="create"
                element={
                  <CreateOrderWrapper>
                    <CreateOrder />
                  </CreateOrderWrapper>
                }
              />
              <Route
                path=":orderId/detail"
                element={
                  <OrderDetailWrapper>
                    <OrderDetail />
                  </OrderDetailWrapper>
                }
              />
            </Route>
            <Route path="products">
              <Route index element={<Products />} />
              <Route
                path=":productId/detail"
                element={
                  <ProductDetailWrapper>
                    <ProductDetail />
                  </ProductDetailWrapper>
                }
              />
            </Route>
            <Route path="customers">
              <Route index element={<Customers />} />
              <Route path=":customerId/detail" element={<CustomerDetail />} />
              <Route path=":customerId/edit" element={<CustomerEdit />} />
            </Route>
            <Route path="settings">
              <Route index element={<Settings />} />
            </Route>
          </Route>
          <Route path="/store">
            <Route index element={<Storefront />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
