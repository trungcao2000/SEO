import {
  readItems,
  addItem,
  updateItem,
  deleteItem,
} from "../api/firebaseService";
import handleUpload from "../Upload";
import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import {
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  LinearProgress,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const categories = ["Điện tử", "Thời trang", "Gia dụng", "Sách", "Khác"];

const marks = [
  { value: 100000, label: "100.000" },
  { value: 200000, label: "200.000" },
  { value: 500000, label: "500.000" },
];

export default function ProductManager() {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const { products, setProducts } = useContext(ProductContext);
  const currentId = "user123";
  const [expandedRows, setExpandedRows] = useState({});
  const [currentProduct, setcurrentProduct] = useState({
    id: "",
    name: "",
    content: "",
    imageUrl: "",
    userId: currentId,
    category: "",
    price: 0,
    createdAt: "",
    status: "Chờ duyệt",
  });
  const productsArray = Object.values(products).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    readItems(setProducts, "products");
  }, [isDone, setProducts]);

  const handleToggleContent = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handlePriceChange = (value) => {
    setcurrentProduct((prev) => ({ ...prev, price: value }));
  };

  const handlePriceInputChange = (e) => {
    const value = Number(e.target.value);
    handlePriceChange(value >= 0 ? value : 0);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setcurrentProduct({
      id: "",
      name: "",
      content: "",
      imageUrl: "",
      userId: currentId,
      category: "",
      price: 0,
      createdAt: "",
      status: "Chờ duyệt",
    });
    setSelectedFile(null);
    setPreviewImage("");
    setUploadProgress(0);
  };

  const handleOpen = (post = null) => {
    if (post) {
      setIsEdit(true);
      setcurrentProduct(post);
      setPreviewImage(post.imageUrl);
    } else {
      setIsEdit(false);
      setcurrentProduct({
        id: "",
        name: "",
        content: "",
        imageUrl: "",
        userId: currentId,
        category: "",
        price: 0,
        createdAt: "",
        status: "Chờ duyệt",
      });
      setPreviewImage("");
    }
    setOpen(true);
  };

  const handleCreate = async () => {
    if (!selectedFile) {
      alert("Vui lòng chọn ảnh trước khi tạo bài viết!");
      return;
    }
    setUploadProgress(10);
    const id = `products_${Date.now()}`;
    const now = new Date().toISOString();
    const imageUrl = await handleUpload(selectedFile, setUploadProgress);

    setUploadProgress(80);
    await addItem(
      id,
      { ...currentProduct, id, createdAt: now, imageUrl },
      "products"
    );
    setUploadProgress(100);
    setIsDone(!isDone);
    setTimeout(() => {
      handleClose();
    }, 500);
  };

  const handleUpdate = async () => {
    let imageUrl = currentProduct.imageUrl;
    if (selectedFile) {
      setUploadProgress(10);
      imageUrl = await handleUpload(selectedFile, setUploadProgress);
      setUploadProgress(80);
    }
    await updateItem(
      currentProduct.id,
      { ...currentProduct, imageUrl },
      "products"
    );
    setUploadProgress(100);
    setIsDone(!isDone);
    setTimeout(() => {
      handleClose();
    }, 500);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?"))
      await deleteItem(id, "products");
    setIsDone(!isDone);
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("vi-VN", {
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
        📦 Quản lý sản phẩm
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
      >
        Thêm sản phẩm
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Đăng lúc</TableCell>
              <TableCell>Người đăng</TableCell>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsArray.map((product, index) => (
              <React.Fragment key={product.id}>
                <TableRow hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {product.content.length > 50 ? (
                      <>
                        {expandedRows[product.id]
                          ? product.content
                          : `${product.content.substring(0, 50)}...`}{" "}
                        <Button
                          size="small"
                          onClick={() => handleToggleContent(product.id)}
                        >
                          {expandedRows[product.id] ? "Ẩn bớt" : "Xem thêm"}
                        </Button>
                      </>
                    ) : (
                      product.content
                    )}
                  </TableCell>
                  <TableCell>{product.category || "Chưa chọn"}</TableCell>
                  <TableCell>
                    {product.price.toLocaleString("vi-VN")} VNĐ
                  </TableCell>
                  <TableCell>{formatDate(product.createdAt)}</TableCell>
                  <TableCell>{product.userId}</TableCell>
                  <TableCell align="center">
                    <Tooltip title={product.imageUrl}>
                      {product.imageUrl.length > 17 ? (
                        <>
                          {expandedRows[product.id] ? (
                            <>
                              <a
                                href={product.imageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  textDecoration: "none",
                                  color: "#1976d2",
                                  wordBreak: "break-word",
                                }}
                              >
                                {product.imageUrl}
                              </a>
                              <Button
                                size="small"
                                onClick={() => handleToggleContent(product.id)}
                                sx={{ textTransform: "none", ml: 1 }}
                              >
                                Ẩn bớt
                              </Button>
                            </>
                          ) : (
                            <>
                              <a
                                href={product.imageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  textDecoration: "none",
                                  color: "#1976d2",
                                }}
                              >
                                {`${product.imageUrl.substring(0, 17)}...`}
                              </a>
                              <Button
                                size="small"
                                onClick={() => handleToggleContent(product.id)}
                                sx={{ textTransform: "none", ml: 1 }}
                              >
                                Xem thêm
                              </Button>
                            </>
                          )}
                        </>
                      ) : (
                        <a
                          href={product.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "#1976d2" }}
                        >
                          {product.imageUrl}
                        </a>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Sửa">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpen(product)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
        </DialogTitle>
        <DialogContent>
          {uploadProgress > 0 && (
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ mb: 2 }}
            />
          )}
          <TextField
            label="Tiêu đề"
            fullWidth
            margin="dense"
            value={currentProduct.name}
            onChange={(e) =>
              setcurrentProduct({ ...currentProduct, name: e.target.value })
            }
          />
          <TextField
            label="Nội dung"
            fullWidth
            multiline
            rows={4}
            margin="dense"
            value={currentProduct.content}
            onChange={(e) =>
              setcurrentProduct({ ...currentProduct, content: e.target.value })
            }
          />
          <TextField
            select
            label="Loại sản phẩm"
            fullWidth
            margin="dense"
            value={currentProduct.category}
            onChange={(e) =>
              setcurrentProduct({ ...currentProduct, category: e.target.value })
            }
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            💵 Chọn giá sản phẩm
          </Typography>
          <Slider
            value={currentProduct.price}
            onChange={(e, value) => handlePriceChange(value)}
            min={0}
            max={500000}
            step={10000}
            marks={marks}
            valueLabelDisplay="auto"
            sx={{ mt: 2 }}
          />
          <TextField
            label="Giá (VNĐ)"
            type="number"
            fullWidth
            margin="dense"
            value={currentProduct.price}
            onChange={handlePriceInputChange}
            inputProps={{ min: 0, step: 10000 }}
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
              accept="image/*"
              onChange={handleFileChange}
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
