import { useState, useMemo } from "react";
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

const drawerWidth = 250;
const marqueeAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;
const menuItems = [
  { text: "Trang chủ", icon: <DashboardIcon />, path: "/" },
  { text: "Bài viết", icon: <ArticleIcon />, path: "/posts" },
  { text: "Thiếp lập đơn hàng", icon: <SettingsIcon />, path: "/settings" },
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
  const phoneNumber = "0376 256 513";
  const emailAddress = "trungthuoclao71@gmail.com";
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
    fontFamily: "Inter, sans-serif",
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
            flexGrow: 1,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <Avatar
            alt="Logo"
            src={Logo}
            sx={{
              width: { xs: 30, sm: 34 },
              height: { xs: 30, sm: 34 },
              mr: 1,
            }}
          />
          <Box
            sx={{
              position: "relative",
              width: { xs: 70, sm: 120, md: 160 },
              overflow: "hidden",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "2rem" },
                whiteSpace: "nowrap",
                display: "inline-block",
                animation: `${marqueeAnimation} 6s linear infinite`,
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
        <meta
          name="keywords"
          content="ĐẶNG TRUNG, THUỐC LÀO TIÊN LÃNG, www.fb.com/thuoclaodangtrung, 0345569129"
        />
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
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <BouncingText>Thuốc Lào Tiên Lãng</BouncingText>
            </Box>
            <Box>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton color="inherit" onClick={toggleContactPanel}>
                <ContactMailIcon />
              </IconButton>
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
              📞 Phone: <a href={`tel:${phoneNumber}`}>84+ 376 256 513</a>
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
              <a href={`mailto:${emailAddress}`}>trungthuoclao71@gmail.com</a>
            </Typography>
            <Typography variant="body2">
              🏢 Địa chỉ: Thôn Thanh Trì, Xã Kiến Thiết, H.Tiên Lãng, TP.Hải
              Phòng
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
      </Box>
    </ThemeProvider>
  );
}
