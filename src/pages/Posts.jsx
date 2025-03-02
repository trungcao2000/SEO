import React, { useState, useEffect, useContext } from "react";
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
  LinearProgress,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import {
  readItems,
  addItem,
  updateItem,
  deleteItem,
} from "../api/firebaseService";
import handleUpload from "../Upload";
import { ProductContext } from "../context/ProductContext";

export default function Posts() {
  const [open, setOpen] = useState(false);
  const { posts, setPosts } = useContext(ProductContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const currentUserId = "user-123";
  const [currentPost, setCurrentPost] = useState({
    id: "",
    title: "",
    content: "",
    imageUrl: "",
    userId: currentUserId,
    createdAt: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    readItems(setPosts, "posts");
  }, [isDone, setPosts]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

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
    setSelectedFile(null);
    setPreviewImage("");
    setUploadProgress(0);
  };

  const handleOpen = (post = null) => {
    if (post) {
      setIsEdit(true);
      setCurrentPost(post);
      setPreviewImage(post.imageUrl);
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
      setPreviewImage("");
    }
    setOpen(true);
  };

  const handleCreate = async () => {
    try {
      if (!selectedFile) {
        alert("Vui lòng chọn ảnh trước khi tạo bài viết!");
        return;
      }

      setUploadProgress(10); // Bắt đầu tải

      const id = `post_${Date.now()}`;
      const now = new Date().toISOString();

      const imageUrl = await handleUpload(selectedFile, setUploadProgress); // Cập nhật tiến trình

      setUploadProgress(80); // Sau khi upload gần hoàn thành

      await addItem(
        id,
        {
          ...currentPost,
          id,
          createdAt: now,
          imageUrl,
        },
        "posts"
      );

      setUploadProgress(100); // Hoàn thành
      setIsDone(!isDone);
      setTimeout(() => {
        handleClose();
      }, 500); // Chờ một chút để người dùng thấy tiến trình 100%

      console.log("✅ Thêm bài viết thành công!");
    } catch (error) {
      console.error("❌ Lỗi thêm bài viết:", error);
      setUploadProgress(0);
    }
  };

  const handleUpdate = async () => {
    try {
      let imageUrl = currentPost.imageUrl;

      if (selectedFile) {
        setUploadProgress(10);
        imageUrl = await handleUpload(selectedFile, setUploadProgress);
        setUploadProgress(80);
      }

      await updateItem(
        currentPost.id,
        {
          ...currentPost,
          imageUrl,
        },
        "posts"
      );

      setUploadProgress(100);
      setIsDone(!isDone);
      setTimeout(() => {
        handleClose();
      }, 500);

      console.log("✅ Cập nhật bài viết thành công!");
    } catch (error) {
      console.error("❌ Lỗi cập nhật:", error);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      try {
        await deleteItem(id, "posts");
      } catch (error) {
        console.error("❌ Lỗi xóa:", error);
      }
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

  const postsArray = Object.values(posts).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

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
        {postsArray.map((post) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              {post.userId === currentUserId && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 8,
                    marginRight: 8,
                  }}
                >
                  <IconButton color="primary" onClick={() => handleOpen(post)}>
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
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Hình ảnh"
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
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
          {uploadProgress > 0 && (
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ marginBottom: 2 }}
            />
          )}

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

          {previewImage && (
            <img
              src={previewImage}
              alt="Xem trước"
              style={{
                width: "100%",
                borderRadius: 8,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          )}

          <Button variant="outlined" component="label" fullWidth>
            Chọn ảnh
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          {isEdit ? (
            <Button
              variant="contained"
              onClick={handleUpdate}
              disabled={uploadProgress > 0 && uploadProgress < 100}
            >
              Lưu chỉnh sửa
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={uploadProgress > 0 && uploadProgress < 100}
            >
              Thêm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
