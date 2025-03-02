import { useState, useMemo, useContext } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
  Slide,
  Paper,
  Button,
  keyframes,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Helmet } from "react-helmet";
import Logo from "../logo.png";
import { styled } from "@mui/system";
import { NavLink, Outlet } from "react-router";
import MessengerChatButton from "../pages/MessengerChatButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const drawerWidth = 288;

const menuItems = [
  {
    text: "Sản Phẩm",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    text: "Đăng Bán",
    icon: <AddShoppingCartIcon />,
    path: "/sells",
  },
  {
    text: "Bài viết",
    icon: <ArticleIcon />,
    path: "/posts",
  },
  {
    text: "Thiết lập đơn hàng",
    icon: <SettingsIcon />,
    path: "/settings",
  },
  {
    text: "Thông tin tài khoản",
    icon: <AdminPanelSettingsIcon />,
    path: "/users",
  },
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [contactOpen, setContactOpen] = useState(true);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleDrawerCollapse = () => setDrawerOpen(!drawerOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleContactPanel = () => setContactOpen(!contactOpen);
  const { isLoggedIn, logout } = useContext(ProductContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Chuyển về trang đăng nhập sau khi đăng xuất
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: darkMode ? "#90caf9" : "#1976d2" },
        },
      }),
    [darkMode]
  );
  const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Chữ nhảy lên 10px */
  }
`;

  // Styled Typography có hiệu ứng
  const BouncingText = styled(Typography)(({ theme }) => ({
    fontWeight: 300,
    fontFamily: '"Times New Roman", serif',
    textTransform: "uppercase",
    color: "white",
    WebkitTextStroke: "1px gold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
    fontSize: "clamp(1.5rem, 2.5vw + 1rem, 4rem)", // Responsive
    animation: `${bounce} 1s infinite ease-in-out`,
    display: "inline-block",
    whiteSpace: "nowrap", // Ngăn xuống hàng
    overflow: "hidden", // Ẩn phần tràn
    textOverflow: "ellipsis", // Hiển thị "..." khi tràn
    maxWidth: "100%", // Giới hạn trong khung
  }));
  const mapLink = "https://maps.app.goo.gl/ozWfrrkh4Rcn4cqn7";
  const rainbowGlow = keyframes`
  0% { color: red; text-shadow: 0 0 10px red, 0 0 20px red; }
  14% { color: orange; text-shadow: 0 0 10px orange, 0 0 20px orange; }
  28% { color: yellow; text-shadow: 0 0 10px yellow, 0 0 20px yellow; }
  42% { color: green; text-shadow: 0 0 10px green, 0 0 20px green; }
  57% { color: blue; text-shadow: 0 0 10px blue, 0 0 20px blue; }
  71% { color: indigo; text-shadow: 0 0 10px indigo, 0 0 20px indigo; }
  85% { color: violet; text-shadow: 0 0 10px violet, 0 0 20px violet; }
  100% { color: red; text-shadow: 0 0 10px red, 0 0 20px red; }
`;
  const handleOpenMap = () => {
    window.open(mapLink, "_blank"); // Mở link trong tab mới
  };
  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            minWidth: 0,
            overflow: "visible",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: 120, sm: 160, md: 200 },
              maxWidth: "100%",
              ml: { xs: 1, sm: 2 }, // Dịch toàn bộ chữ sang phải
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.6rem", md: "1.8rem" },
                fontFamily: '"Times New Roman", serif',
                whiteSpace: "nowrap",
                flexShrink: 0,
                textAlign: "center",
                pl: { xs: 0.5, sm: 1 }, // Đẩy chữ sang phải
                pr: { xs: 2, sm: 3 }, // ⚡️ Thêm khoảng cách bên phải để mũi tên không che chữ
                animation: `${rainbowGlow} 3s infinite ease-in-out`,
                "&:hover": {
                  color: "primary.main",
                  animationPlayState: "paused",
                },
              }}
            >
              ĐẶNG TRUNG
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            ml: { xs: 0.5, sm: 1 },
          }}
        >
          <IconButton
            onClick={handleDrawerCollapse}
            sx={{
              p: { xs: 0.8, sm: 1.2 },
              bgcolor: "background.paper",
              borderRadius: "50%",
              transition: "all 0.3s ease",
              boxShadow: 2,
              zIndex: 1,
              ml: { xs: 0.5, sm: 1 }, // 🚀 Dịch nút mũi tên sang phải thêm khoảng trống
              "&:hover": {
                bgcolor: "primary.light",
                transform: "scale(1.1)",
              },
            }}
          >
            {drawerOpen ? (
              <ChevronLeftIcon
                fontSize={window.innerWidth < 600 ? "small" : "medium"}
              />
            ) : (
              <ChevronRightIcon
                fontSize={window.innerWidth < 600 ? "small" : "medium"}
              />
            )}
          </IconButton>
        </Box>
      </Toolbar>

      <Divider />
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItemButton
            key={text}
            component={NavLink}
            to={path}
            sx={{
              justifyContent: drawerOpen ? "flex-start" : "center",
              px: drawerOpen ? 2 : 1,
              "&.active": {
                bgcolor: "primary.main",
                color: "white",
                "& .MuiListItemIcon-root": { color: "white" },
              },
            }}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 2 : "auto",
                justifyContent: "center",
              }}
            >
              {icon}
            </ListItemIcon>
            {drawerOpen && <ListItemText primary={text} />}
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>ĐẶNG TRUNG</title>
        <meta name="description" content="ĐẶNG TRUNG - THUỐC LÀO TIÊN LÃNG" />
        <meta name="keywords" content="ĐẶNG TRUNG, THUỐC LÀO TIÊN LÃNG" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="canonical" href="hhtps://caovantrung.netlify.app/" />
      </Helmet>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 56}px)` },
            ml: { sm: `${drawerOpen ? drawerWidth : 56}px` },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: { xs: 1, sm: 2 },
              height: { xs: 56, sm: 64 }, // Chiều cao nhỏ hơn trên mobile
            }}
          >
            {/* Menu & Title (Mobile: chỉ hiển thị icon menu và chữ nhỏ hơn) */}
            <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: { xs: 0.5, sm: 1 }, display: { sm: "none" } }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
              <Avatar
                alt="Logo"
                src={Logo}
                sx={{
                  width: { xs: 32, sm: 44, md: 60 },
                  height: { xs: 32, sm: 44, md: 60 },
                  mx: { xs: 0.5, sm: 1.5 },
                }}
              />
              <BouncingText
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.5rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                  ml: { xs: 0.5, sm: 1 },
                }}
              >
                Thuốc Lào Tiên Lãng
              </BouncingText>
            </Box>

            {/* Logo Avatar (Nhỏ hơn trên mobile, căn giữa) */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
            ></Box>

            {/* Icon Buttons (Thu nhỏ icon trên mobile và giảm khoảng cách) */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                gap: { xs: 0.5, sm: 1 }, // Khoảng cách linh hoạt cho mobile và PC
              }}
            >
              <IconButton
                color="inherit"
                onClick={toggleDarkMode}
                sx={{
                  p: { xs: 0.5, sm: 1 }, // Padding nhỏ hơn cho mobile
                  width: { xs: 46, sm: 50 },
                  height: { xs: 46, sm: 50 },
                }}
              >
                {darkMode ? (
                  <Brightness7Icon fontSize="medium" />
                ) : (
                  <Brightness4Icon fontSize="medium" />
                )}
              </IconButton>

              <IconButton
                color="inherit"
                onClick={toggleContactPanel}
                sx={{
                  p: { xs: 0.5, sm: 1 },
                  width: { xs: 46, sm: 50 },
                  height: { xs: 46, sm: 50 },
                }}
              >
                <ContactMailIcon fontSize="medium" />
              </IconButton>
              <AuthButtons
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
              />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Drawer menu */}
        <Box
          component="nav"
          sx={{
            width: { sm: drawerOpen ? drawerWidth : 56 },
            flexShrink: { sm: 0 },
          }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            open={drawerOpen}
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                width: drawerOpen ? drawerWidth : 56,
                transition: "width 0.3s",
                overflowX: "hidden",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 56}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
        <Slide
          direction="left"
          in={contactOpen}
          mountOnEnter
          unmountOnExit
          appear
        >
          <Paper
            elevation={6}
            sx={{
              position: "fixed",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 250,
              p: 2,
              borderRadius: "8px 0 0 8px",
              zIndex: 1201,
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Liên hệ</Typography>
              <IconButton size="small" onClick={toggleContactPanel}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="body2">
              📞 Phone:{" "}
              <a
                href="tel:0376256513"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                }}
              >
                0376 256 513
              </a>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              startIcon={<ChatIcon />}
              onClick={() =>
                window.open("https://zalo.me/0376 256 513", "_blank")
              }
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              Chat qua Zalo
            </Button>
            <Typography variant="body2">
              ✉️ Email:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=trungthuoclao71@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                }}
              >
                trungthuoclao71@gmail.com
              </a>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              startIcon={<LocationOnIcon />}
              onClick={handleOpenMap}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              Mở Google Maps
            </Button>
          </Paper>
        </Slide>
        {<MessengerChatButton />}
      </Box>
    </ThemeProvider>
  );
}
