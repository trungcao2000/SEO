import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router";

const drawerWidth = 240;

const menuItems = [
  { text: "Trang chủ", icon: <DashboardIcon />, path: "/" },
  { text: "Bài viết", icon: <ArticleIcon />, path: "/posts" },
  { text: "Thiếp lập đơn hàng", icon: <SettingsIcon />, path: "/settings" },
];

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const drawer = (
    <>
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItemButton
            key={text}
            component={NavLink}
            to={path}
            sx={{ "&.active": { bgcolor: "primary.main", color: "white" } }}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
    </>
  );

  return (
    <>
      {/* Sidebar cho mobile */}
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

      {/* Sidebar cho desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}
