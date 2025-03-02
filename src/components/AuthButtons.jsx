import React from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate, useLocation } from "react-router-dom";

const AuthButtons = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    if (location.pathname === "/login") {
      // Nếu đang ở trang /login, reload modal hoặc thực hiện hành động khác
      window.dispatchEvent(new Event("openLoginModal")); // Tuỳ chọn: dùng sự kiện custom
    } else {
      navigate("/login"); // Nếu chưa ở /login, chuyển hướng
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {isLoggedIn ? (
        <Tooltip title="Đăng xuất">
          <IconButton color="error" onClick={handleLogout}>
            <LogoutIcon sx={{ fontWeight: "bold", fontSize: 28 }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Đăng nhập">
          <IconButton
            color="default"
            onClick={handleLoginClick}
            sx={{ color: "white" }}
          >
            <LoginIcon sx={{ fontWeight: "bold", fontSize: 28 }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default AuthButtons;
