import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,
  Input,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import api from "../api/apiPosts";

export default function Posts() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUserId] = useState("user-123"); // ID người dùng hiện tại
  const [currentPost, setCurrentPost] = useState({
    id: "",
    title: "",
    content: "",
    imageUrl: "",
    userId: currentUserId,
    createdAt: "",
  });

  function generateUniqueId() {
    const timestamp = Math.floor(Date.now() / 1000);
    const randomStr = Math.random().toString(36).substring(2, 6);
    return `${timestamp}_${randomStr}`;
  }

  const readData = async () => {
    try {
      const response = await api.get();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    readData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setCurrentPost({
      id: "",
      title: "",
      content: "",
      imageUrl: "",
      userId: currentUserId,
      createdAt: "",
    });
  };

  const handleOpen = (post = null) => {
    if (post) {
      setIsEdit(true);
      setCurrentPost(post);
    } else {
      setIsEdit(false);
      setCurrentPost({
        id: "",
        title: "",
        content: "",
        imageUrl: "",
        userId: currentUserId,
        createdAt: "",
      });
    }
    setOpen(true);
  };

  const handleCreate = async () => {
    try {
      const newId = generateUniqueId();
      const now = new Date().toISOString();
      await api.post("", {
        data: [{ ...currentPost, id: newId, createdAt: now }],
      });
      readData();
      handleClose();
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/id/${currentPost.id}`, { data: [currentPost] });
      readData();
      handleClose();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/id/${id}`);
      readData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setCurrentPost({ ...currentPost, [type]: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        📝 Bài viết
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
      >
        Thêm bài viết
      </Button>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {data.map((post) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  {post.content}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontStyle: "italic" }}
                >
                  🕒 Đăng lúc: {formatDate(post.createdAt)}
                </Typography>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Hình ảnh"
                    style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
                  />
                )}
                {post.userId === currentUserId && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 8,
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(post)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {isEdit ? "Chỉnh sửa bài viết" : "Thêm bài viết"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tiêu đề"
            fullWidth
            value={currentPost.title}
            onChange={(e) =>
              setCurrentPost({ ...currentPost, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Nội dung"
            fullWidth
            multiline
            rows={4}
            value={currentPost.content}
            onChange={(e) =>
              setCurrentPost({ ...currentPost, content: e.target.value })
            }
          />
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            Hình ảnh
          </Typography>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image")}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          {isEdit ? (
            <Button variant="contained" onClick={handleUpdate}>
              Lưu chỉnh sửa
            </Button>
          ) : (
            <Button variant="contained" onClick={handleCreate}>
              Thêm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
