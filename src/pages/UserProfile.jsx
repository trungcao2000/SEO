import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { getUserProfile, updateUserProfile } from "../api/firebaseService";
const UserProfile = ({ phone }) => {
  const [user, setUser] = useState({ name: "", phone: "", adress: "" });

  // 📌 Lấy thông tin user từ Firebase khi mở trang
  useEffect(() => {
    if (phone) {
      getUserProfile(phone).then((data) => {
        if (data) setUser(data);
      });
    }
  }, [phone]);

  // 🔄 Cập nhật state khi nhập dữ liệu
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 💾 Lưu cập nhật
  const handleUpdate = async () => {
    try {
      await updateUserProfile(user.phone, {
        name: user.name,
        adress: user.adress,
      });
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      alert("Lỗi cập nhật: " + error.message);
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
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Hồ sơ người dùng
      </Typography>

      <TextField
        fullWidth
        name="name"
        label="Họ và Tên"
        value={user.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="phone"
        label="Số điện thoại"
        value={user.phone}
        disabled
        margin="normal"
      />
      <TextField
        fullWidth
        name="adress"
        label="Địa chỉ"
        value={user.adress}
        onChange={handleChange}
        margin="normal"
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleUpdate}
      >
        Cập nhật
      </Button>
    </Box>
  );
};

export default UserProfile;
