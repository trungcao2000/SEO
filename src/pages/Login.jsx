import { useState } from "react";
import { Tab, Tabs, Box, TextField, Button, Typography } from "@mui/material";
import { registerUser, loginUser } from "../api/firebaseService";

const AuthComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [creatUser, setCreatUser] = useState({
    id: "",
    name: "",
    phone: "",
    pass: "",
    adress: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  // 🆕 Cập nhật state khi nhập dữ liệu
  const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCreatUser((prev) => ({ ...prev, [name]: value }));

    if (name === "phone") {
      if (!phoneRegex.test(value)) {
        setErrorMessage(
          "⚠️ Số điện thoại không hợp lệ! Vui lòng nhập số VN (bắt đầu 03, 05, 07, 08, 09)"
        );
      } else {
        setErrorMessage(""); // Xóa lỗi nếu hợp lệ
      }
    }
  };

  // 🟠 Đăng ký
  const handleRegister = async () => {
    try {
      await registerUser(creatUser);
      alert("Đăng ký thành công!");
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔵 Đăng nhập
  const handleLogin = async () => {
    try {
      const user = await loginUser(creatUser.phone, creatUser.pass);
      alert(`Đăng nhập thành công: ${user.name}, Địa chỉ: ${user.adress}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        centered
      >
        <Tab label="Đăng nhập" />
        <Tab label="Đăng ký" />
      </Tabs>

      {tabIndex === 0 ? (
        // 🟢 Tab Đăng nhập
        <Box sx={{ mt: 2 }}>
          <Box sx={{ width: "100%", textAlign: "left", mt: 1 }}>
            <TextField
              fullWidth
              name="phone"
              label="Số điện thoại"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
            />
          </Box>

          {/* Hiển thị lỗi bên ngoài */}
          {errorMessage && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}

          <TextField
            fullWidth
            name="pass"
            type="password"
            label="Mật khẩu"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </Box>
      ) : (
        // 🟠 Tab Đăng ký
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            name="name"
            label="Họ và Tên"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="phone"
            label="Số điện thoại"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="adress"
            label="Địa chỉ"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="pass"
            type="password"
            label="Mật khẩu"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            Đăng ký
          </Button>
        </Box>
      )}

      <Typography
        variant="body2"
        sx={{ mt: 2, textAlign: "center", color: "gray" }}
      >
        {tabIndex === 0
          ? "Chưa có tài khoản? Đăng ký ngay!"
          : "Đã có tài khoản? Đăng nhập ngay!"}
      </Typography>
    </Box>
  );
};

export default AuthComponent;
