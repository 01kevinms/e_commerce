import { HashRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/interface/Dashboard"
import ItemSelect from "./pages/interface/Product"
import Login from "./pages/interface/Login"
import CartUser from "./pages/user/CartUser"
import MenuDashBoard from "./layout/Menu"
import Settings from "./layout/Settings"
import Register from "./pages/interface/Register"
import { ProtectedRoute } from "./services/ProtectRoutes"
import Profile from "./pages/user/SettingUser"
import Favoritos from "./pages/user/Favoritos"
import Checkout from "./pages/user/Checkout"
import UserMain from "./pages/user/UserMain"
import ListOrders from "./pages/user/ListOrders"
import Orders from "./pages/user/Orders"
import { SearchPage } from "./pages/interface/SearchPage"
import DashboardStore from "./pages/store/DashboardStore"
import CreateStore from "./components/store/CreateStore"



function App() {
  
  return (
    <HashRouter>
  <Routes>

    {/* AUTH */}
    <Route path="/signin" element={<Login />} />
    <Route path="/signup" element={<Register />} />

    {/* PÚBLICAS (VISITANTES) */}
    <Route element={<MenuDashBoard />}>
      <Route index element={<Dashboard />} />
      <Route path="product/:id" element={<ItemSelect />} />
      <Route path="search" element={<SearchPage />} />
    </Route>
    <Route element={<ProtectedRoute />}>
      <Route element={<MenuDashBoard />}>

        <Route path="cart" element={<CartUser />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="checkout" element={<Checkout />} />

        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />

        <Route path="user" element={<UserMain />} />
        <Route path="orders" element={<ListOrders />} />
        <Route path="order/:id" element={<Orders />} />

        {/* LOJA */}
        <Route path="store/dashboard" element={<DashboardStore />} />
        <Route path="user/store" element={<CreateStore />} />

      </Route>
    </Route>

  </Routes>
</HashRouter>
   
  )
}

export default App
