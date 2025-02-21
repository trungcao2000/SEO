import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Settings from "./pages/Settings";
import theme from "./pages/theme";
import MessengerChatButton from "./pages/MessengerChatButton";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MessengerChatButton />
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
