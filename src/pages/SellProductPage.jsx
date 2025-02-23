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
  CardMedia,
  Chip,
  MenuItem,
  Slider,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import api from "../api/apiProducts";

const categories = ["Điện tử", "Thời trang", "Gia dụng", "Sách", "Khác"];
const soldStatus = ["Chưa bán", "Đã bán"];

export default function SellProductPage() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 100000,
    category: "",
    imageUrl: "",
    sold: "Chưa bán",
  });

  const generateUniqueId = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const randomStr = Math.random().toString(36).substring(2, 6);
    return `${timestamp}_${randomStr}`;
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get();
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Lỗi khi tải dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setCurrentProduct({
      id: "",
      name: "",
      description: "",
      price: 100000,
      category: "",
      imageUrl: "",
      sold: "Chưa bán",
    });
  };

  const handleOpen = (product = null) => {
    if (product) {
      setIsEdit(true);
      setCurrentProduct(product);
    } else {
      setIsEdit(false);
      setCurrentProduct({
        id: "",
        name: "",
        description: "",
        price: 100000,
        category: "",
        imageUrl: "",
        sold: "Chưa bán",
      });
    }
    setOpen(true);
  };

  const handleCreate = async () => {
    try {
      const newId = generateUniqueId();
      const now = new Date().toISOString();
      await api.post("", {
        data: [
          { ...currentProduct, id: newId, createdAt: now, sold: "Chưa bán" },
        ],
      });
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error("❌ Lỗi khi thêm sản phẩm:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/id/${currentProduct.id}`, { data: [currentProduct] });
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("❗Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await api.delete(`/id/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("❌ Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setCurrentProduct((prev) => ({ ...prev, imageUrl: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (e, newValue) => {
    setCurrentProduct({ ...currentProduct, price: newValue });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Times New Roman" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Đăng Bán Sản Phẩm
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ mb: 3 }}
      >
        Thêm sản phẩm
      </Button>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ borderRadius: "12px", boxShadow: 3 }}>
              {product.imageUrl && (
                <CardMedia
                  component="img"
                  height="180"
                  image={product.imageUrl}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
              )}
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.description || "Không có mô tả"}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Phân loại: {product.category}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                >
                  Giá: {Number(product.price).toLocaleString("vi-VN")} VNĐ
                </Typography>
                <Chip
                  label={product.sold === "Đã bán" ? "Đã bán" : "Chưa bán"}
                  color={product.sold === "Đã bán" ? "success" : "default"}
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px",
                }}
              >
                <IconButton color="primary" onClick={() => handleOpen(product)}>
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(product.id)}
                >
                  <Delete />
                </IconButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Tên sản phẩm"
            fullWidth
            margin="normal"
            value={currentProduct.name}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, name: e.target.value })
            }
          />
          <TextField
            label="Mô tả"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={currentProduct.description}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct,
                description: e.target.value,
              })
            }
          />
          <TextField
            select
            label="Phân loại"
            fullWidth
            margin="normal"
            value={currentProduct.category}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, category: e.target.value })
            }
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <Typography gutterBottom>Giá (100.000 - 500.000 VNĐ)</Typography>
          <Slider
            value={currentProduct.price}
            min={100000}
            max={500000}
            step={100000}
            marks
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value.toLocaleString("vi-VN")} VNĐ`}
            onChange={handlePriceChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Giá (VNĐ)"
            type="number"
            fullWidth
            margin="normal"
            value={currentProduct.price}
            onChange={(e) => handlePriceChange(null, Number(e.target.value))}
          />
          {isEdit && (
            <TextField
              select
              label="Trạng thái bán"
              fullWidth
              margin="normal"
              value={currentProduct.sold}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, sold: e.target.value })
              }
            >
              {soldStatus.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          )}
          <Input
            type="file"
            fullWidth
            onChange={handleFileChange}
            sx={{ mt: 2 }}
          />
          {currentProduct.imageUrl && (
            <img
              src={currentProduct.imageUrl}
              alt="Xem trước"
              style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            variant="contained"
            onClick={isEdit ? handleUpdate : handleCreate}
          >
            {isEdit ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// import React, { useState } from "react";
// import {
//   Container,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Slider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   IconButton,
//   Divider,
//   CardActions,
//   Chip,
//   InputAdornment,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// const categories = ["Điện tử", "Thời trang", "Gia dụng", "Sách", "Khác"];
// const priceMarks = [
//   { value: 100000, label: "100K" },
//   { value: 200000, label: "200K" },
//   { value: 500000, label: "500K" },
// ];

// const SellProductPage = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: 200000,
//     category: "",
//     image: null,
//   });
//   const [products, setProducts] = useState([]);
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePriceChange = (value) => {
//     setProduct((prev) => ({ ...prev, price: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setProduct((prev) => ({ ...prev, image: file }));
//     setImagePreview(file ? URL.createObjectURL(file) : null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!product.name || !product.category) {
//       alert("Vui lòng điền đầy đủ thông tin.");
//       return;
//     }

//     const newProduct = {
//       ...product,
//       id: Date.now(),
//       sold: false,
//       imageUrl: imagePreview,
//     };

//     setProducts([newProduct, ...products]);
//     alert("✅ Sản phẩm đã được đăng bán!");
//     setProduct({
//       name: "",
//       description: "",
//       price: 200000,
//       category: "",
//       image: null,
//     });
//     setImagePreview(null);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("❗Bạn có chắc muốn xóa sản phẩm này?")) {
//       setProducts(products.filter((item) => item.id !== id));
//     }
//   };

//   const toggleSoldStatus = (id) => {
//     setProducts((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, sold: !item.sold } : item
//       )
//     );
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4, fontFamily: "Times New Roman" }}>
//       <Card sx={{ borderRadius: "16px", boxShadow: 3, mb: 4 }}>
//         <CardContent>
//           <Typography
//             variant="h4"
//             gutterBottom
//             textAlign="center"
//             fontWeight="bold"
//           >
//             Đăng Bán Sản Phẩm
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Tên sản phẩm"
//                   name="name"
//                   value={product.name}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Mô tả"
//                   name="description"
//                   value={product.description}
//                   onChange={handleChange}
//                   fullWidth
//                   multiline
//                   rows={3}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel>Phân loại</InputLabel>
//                   <Select
//                     name="category"
//                     value={product.category}
//                     label="Phân loại"
//                     onChange={handleChange}
//                   >
//                     {categories.map((cat) => (
//                       <MenuItem key={cat} value={cat}>
//                         {cat}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
// <Grid item xs={12} sm={6}>
//   <TextField
//     label="Giá (VNĐ)"
//     name="price"
//     value={product.price}
//     onChange={handlePriceChange}
//     fullWidth
//     required
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <AttachMoneyIcon />
//         </InputAdornment>
//       ),
//     }}
//   />
//   <Slider
//     value={product.price}
//     onChange={(_, value) => handlePriceChange(value)}
//     step={100000}
//     marks={priceMarks}
//     min={100000}
//     max={500000}
//     valueLabelDisplay="auto"
//   />
// </Grid>
//               <Grid item xs={12} sm={6} textAlign="center">
//                 <input
//                   accept="image/*"
//                   type="file"
//                   id="upload-image"
//                   hidden
//                   onChange={handleImageUpload}
//                 />
//                 <label htmlFor="upload-image">
//                   <Button
//                     variant="contained"
//                     component="span"
//                     startIcon={<CloudUploadIcon />}
//                   >
//                     Tải ảnh
//                   </Button>
//                 </label>
//                 {imagePreview && (
//                   <img
//                     src={imagePreview}
//                     alt="Xem trước"
//                     style={{ marginTop: 10, maxWidth: "100%", borderRadius: 8 }}
//                   />
//                 )}
//               </Grid>
//               <Grid item xs={12} textAlign="center">
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   sx={{ px: 5, borderRadius: "12px" }}
//                 >
//                   Đăng Bán
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </CardContent>
//       </Card>

//       {products.length > 0 && (
//         <>
//           <Typography
//             variant="h5"
//             gutterBottom
//             fontWeight="bold"
//             textAlign="center"
//           >
//             🛒 Danh Sách Sản Phẩm Đã Đăng
//           </Typography>
//           <Grid container spacing={4}>
//             {products.map(
//               ({ id, name, description, price, category, imageUrl, sold }) => (
//                 <Grid item xs={12} sm={6} md={4} key={id}>
//                   <Card sx={{ borderRadius: "12px", boxShadow: 2 }}>
//                     {imageUrl && (
//                       <CardMedia
//                         component="img"
//                         height="180"
//                         image={imageUrl}
//                         alt={name}
//                         sx={{ objectFit: "cover" }}
//                       />
//                     )}
//                     <CardContent>
//                       <Typography variant="h6" fontWeight="bold" gutterBottom>
//                         {name}
//                       </Typography>
//                       <Typography variant="body2" gutterBottom>
//                         {description || "Không có mô tả"}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Phân loại: {category}
//                       </Typography>
//                       <Typography
//                         variant="subtitle1"
//                         color="primary"
//                         fontWeight="bold"
//                         gutterBottom
//                       >
//                         Giá: {price.toLocaleString("vi-VN")} VNĐ
//                       </Typography>
//                       <Chip
//                         label={sold ? "Đã bán" : "Chưa bán"}
//                         color={sold ? "error" : "success"}
//                         icon={sold ? <CheckCircleIcon /> : <CancelIcon />}
//                         sx={{ mt: 1 }}
//                       />
//                     </CardContent>
//                     <Divider />
//                     <CardActions sx={{ justifyContent: "space-between" }}>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         color={sold ? "secondary" : "success"}
//                         onClick={() => toggleSoldStatus(id)}
//                       >
//                         {sold ? "Đánh dấu chưa bán" : "Đánh dấu đã bán"}
//                       </Button>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDelete(id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               )
//             )}
//           </Grid>
//         </>
//       )}
//     </Container>
//   );
// };

// export default SellProductPage;
