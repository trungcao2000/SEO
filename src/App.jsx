import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Settings from "./pages/Settings";
import SellProductPage from "./pages/SellProductPage";
import theme from ".//theme";
import { ProductProvider } from "./context/ProductContext";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProductProvider>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route path="/login" element={<Login />} />
              <Route index element={<Dashboard />} />
              <Route path="posts" element={<Posts />} />
              <Route path="sells" element={<SellProductPage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<UserProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </ThemeProvider>
  );
}
