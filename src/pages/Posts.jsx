import React, { useState } from "react";
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

export default function Posts() {
  const [open, setOpen] = useState(false);
  const [currentUserId] = useState("user-123"); // ID người dùng hiện tại
  const [posts, setPosts] = useState([
    {
      id: "post-1",
      title: "Bài viết của người khác",
      content: "Đây là bài viết không thuộc về bạn.",
      image: "",
      video: "",
      userId: "user-999",
      createdAt: "2025-02-20T14:30:00",
    },
    {
      id: "post-2",
      title: "Bài viết của tôi",
      content: "Đây là bài viết của bạn.",
      image: "",
      video: "",
      userId: currentUserId,
      createdAt: "2025-02-21T09:15:00",
    },
  ]);

  const [currentPost, setCurrentPost] = useState({
    id: "",
    title: "",
    content: "",
    image: "",
    video: "",
    userId: currentUserId,
    createdAt: "",
    index: null,
  });

  const handleOpen = (
    post = {
      id: "",
      title: "",
      content: "",
      image: "",
      video: "",
      userId: currentUserId,
      createdAt: "",
      index: null,
    }
  ) => {
    setCurrentPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPost({
      id: "",
      title: "",
      content: "",
      image: "",
      video: "",
      userId: currentUserId,
      createdAt: "",
      index: null,
    });
  };

  const handleSave = () => {
    const now = new Date().toISOString(); // Lấy thời gian hiện tại
    if (currentPost.index !== null) {
      // Chỉnh sửa bài viết
      const updatedPosts = posts.map((post, i) =>
        i === currentPost.index && post.userId === currentUserId
          ? {
              ...post,
              title: currentPost.title,
              content: currentPost.content,
              image: currentPost.image,
              video: currentPost.video,
            }
          : post
      );
      setPosts(updatedPosts);
    } else {
      // Thêm bài viết mới
      setPosts([
        ...posts,
        {
          id: `post-${Date.now()}`,
          title: currentPost.title,
          content: currentPost.content,
          image: currentPost.image,
          video: currentPost.video,
          userId: currentUserId,
          createdAt: now, // Gán thời gian tạo
        },
      ]);
    }
    handleClose();
  };

  const handleDelete = (index) => {
    if (posts[index].userId === currentUserId) {
      setPosts(posts.filter((_, i) => i !== index));
    } else {
      alert("Bạn không có quyền xóa bài viết này.");
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
        {posts.map((post, index) => (
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
                {post.video && (
                  <video
                    controls
                    style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
                  >
                    <source src={post.video} type="video/mp4" />
                    Trình duyệt không hỗ trợ video.
                  </video>
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
                      onClick={() => handleOpen({ ...post, index })}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(index)}
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
          {currentPost.index !== null ? "Chỉnh sửa bài viết" : "Thêm bài viết"}
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
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            Video
          </Typography>
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "video")}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button variant="contained" onClick={handleSave}>
            {currentPost.index !== null ? "Lưu chỉnh sửa" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
