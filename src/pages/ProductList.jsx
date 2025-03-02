import React, { useContext, useState, useMemo } from "react";
import {
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Slider,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function ProductManager() {
  const { products, isLoggedIn } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const categories = ["Điện tử", "Thời trang", "Gia dụng", "Sách", "Khác"];
  const navigate = useNavigate();
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handlePriceChange = (_, newValue) => setPriceRange(newValue);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn) {
      navigate("/login"); // Chuyển đến trang đăng nhập nếu chưa đăng nhập
    } else {
      alert(`Bạn đã chọn mua sản phẩm: ${product.name}`);
      // Thêm logic mua hàng ở đây
    }
  };

  const truncateContent = (content, maxLength = 150) => {
    if (!content) return "";
    return content.length > maxLength && !showFullContent
      ? `${content.slice(0, maxLength)}...`
      : content;
  };
  const productsArray = Object.values(products).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const filteredProducts = useMemo(() => {
    return Object.values(productsArray)
      .filter((product) =>
        selectedCategory ? product.category === selectedCategory : true
      )
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [productsArray, selectedCategory, searchTerm, priceRange]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        📦 Danh Sách Sản phẩm
      </Typography>
      <Paper
        elevation={3}
        sx={{
          position: "sticky",
          top: 64,
          zIndex: 1100,
          p: 1.5,
          mb: 2,
          borderRadius: "10px",
        }}
      >
        <Box display="flex" gap={1.5} flexWrap="wrap" alignItems="center">
          {/* Phân Loại */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Phân Loại</InputLabel>
            <Select
              value={selectedCategory}
              label="Phân Loại"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Tìm kiếm sản phẩm */}
          <TextField
            label="Tìm kiếm sản phẩm"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{ width: 200 }}
          />

          {/* Thanh trượt giá */}
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <Typography variant="body2" gutterBottom>
              Khoảng Giá: {priceRange[0].toLocaleString()} -{" "}
              {priceRange[1].toLocaleString()} VND
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              size="small"
              step={100000}
              marks={[
                { value: 0, label: "0" },
                { value: 100000, label: "100k" },
                { value: 200000, label: "200k" },
                { value: 500000, label: "500k" },
              ]}
              min={0}
              max={500000}
            />
          </Box>
        </Box>

        {/* Hiển thị số lượng sản phẩm sau khi lọc */}
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          {filteredProducts.length} sản phẩm được tìm thấy
        </Typography>
      </Paper>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} md={6} lg={4} key={product.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
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

              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  🏷️ Loại sản phẩm: {product.category || "Chưa chọn"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  💵 Giá: {product.price.toLocaleString("vi-VN")} VNĐ
                </Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="info"
                    sx={{ flex: 1 }}
                    onClick={() => handleViewDetails(product)}
                  >
                    👁️ Xem thêm
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ flex: 1 }}
                    onClick={() => handleBuyNow(product)}
                  >
                    🛒 Mua ngay
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedProduct && (
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Chi tiết sản phẩm</DialogTitle>
          <DialogContent dividers>
            {selectedProduct.imageUrl && (
              <img
                src={selectedProduct.imageUrl}
                alt="Hình ảnh sản phẩm"
                style={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              />
            )}

            <Typography variant="h6" gutterBottom>
              {selectedProduct.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 1, whiteSpace: "pre-line", textAlign: "justify" }}
            >
              {truncateContent(selectedProduct.content)}
            </Typography>

            {selectedProduct.content.length > 150 && (
              <Button
                size="small"
                onClick={() => setShowFullContent(!showFullContent)}
                sx={{ mb: 1 }}
              >
                {showFullContent ? "Ẩn bớt" : "Xem thêm"}
              </Button>
            )}

            <Typography variant="body2" sx={{ mb: 1 }}>
              🏷️ Loại: {selectedProduct.category}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              💵 Giá: {selectedProduct.price.toLocaleString("vi-VN")} VNĐ
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              👤 Đăng bởi: {selectedProduct.userId}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              🕒 Đăng lúc:{" "}
              {new Date(selectedProduct.createdAt).toLocaleString()}
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Đóng
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert(`Mua sản phẩm: ${selectedProduct.name}`)}
            >
              Mua ngay
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Typography,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   CardMedia,
//   Box,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   TextField,
//   Slider,
//   Paper,
// } from "@mui/material";
// import Qrcodeme from "../qrcode.png";

// export default function ProductList() {
//   const [open, setOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [priceRange, setPriceRange] = useState([0, 500000]);

//   const handleBuyClick = (product) => {
//     setSelectedProduct(product);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedProduct(null);
//     setPaymentMethod("");
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handlePriceChange = (event, newValue) => {
//     setPriceRange(newValue);
//   };

//   const filteredProducts = products.filter(
//     (product) =>
//       !product.isSold &&
//       (!selectedCategory || product.category === selectedCategory) &&
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       product.price >= priceRange[0] &&
//       product.price <= priceRange[1]
//   );

//   return (
//     <Box sx={{ p: 1 }}>
//       {/* Thêm margin-top để tránh đè lên AppBar */}
//       <Typography variant="h4" gutterBottom>
//         Danh Sách Sản Phẩm Đăng Bán
//       </Typography>
// <Paper
//   elevation={3}
//   sx={{
//     position: "sticky",
//     top: 64,
//     zIndex: 1100,
//     p: 1.5, // Giảm padding
//     mb: 2, // Giảm margin dưới
//     borderRadius: "10px",
//   }}
// >
//   <Box display="flex" gap={1.5} flexWrap="wrap" alignItems="center">
//     {/* Phân Loại */}
//     <FormControl size="small" sx={{ minWidth: 140 }}>
//       <InputLabel>Phân Loại</InputLabel>
//       <Select
//         value={selectedCategory}
//         label="Phân Loại"
//         onChange={handleCategoryChange}
//       >
//         <MenuItem value="">Tất cả</MenuItem>
//         {categories.map((category) => (
//           <MenuItem key={category} value={category}>
//             {category}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>

//     {/* Tìm kiếm sản phẩm */}
//     <TextField
//       label="Tìm kiếm sản phẩm"
//       value={searchTerm}
//       onChange={handleSearchChange}
//       variant="outlined"
//       size="small"
//       sx={{ width: 200 }}
//     />

//     {/* Thanh trượt giá */}
//     <Box sx={{ flex: 1, minWidth: 220 }}>
//       <Typography variant="body2" gutterBottom>
//         Khoảng Giá: {priceRange[0].toLocaleString()} -{" "}
//         {priceRange[1].toLocaleString()} VND
//       </Typography>
//       <Slider
//         value={priceRange}
//         onChange={handlePriceChange}
//         valueLabelDisplay="auto"
//         size="small"
//         step={100000}
//         marks={[
//           { value: 0, label: "0" },
//           { value: 100000, label: "100k" },
//           { value: 200000, label: "200k" },
//           { value: 500000, label: "500k" },
//         ]}
//         min={0}
//         max={500000}
//       />
//     </Box>
//   </Box>
// </Paper>

//       <Grid container spacing={3}>
//         {filteredProducts.length ? (
//           filteredProducts.map((product) => (
//             <Grid item xs={12} sm={6} md={4} key={product.id}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   borderRadius: "16px",
//                   boxShadow: 3,
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={product.image}
//                   alt={product.name}
//                   sx={{
//                     width: "100%",
//                     height: 200,
//                     objectFit: "contain",
//                     borderTopLeftRadius: "16px",
//                     borderTopRightRadius: "16px",
//                     backgroundColor: "#f5f5f5",
//                   }}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" noWrap gutterBottom>
//                     {product.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Phân Loại: {product.category}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     Giá: {product.price.toLocaleString()} VND
//                   </Typography>
//                 </CardContent>
//                 <CardActions sx={{ p: 2 }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     onClick={() => handleBuyClick(product)}
//                     sx={{ borderRadius: "12px", textTransform: "none" }}
//                   >
//                     Mua
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body1" color="text.secondary" sx={{ m: 2 }}>
//             Không tìm thấy sản phẩm phù hợp.
//           </Typography>
//         )}
//       </Grid>
//       {selectedProduct && (
//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//           <DialogTitle>
//             Phương Thức Thanh Toán - {selectedProduct.name}
//           </DialogTitle>
//           <DialogContent>
//             <Typography variant="body1" gutterBottom>
//               Lựa chọn phương thức thanh toán
//             </Typography>
//             <RadioGroup
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             >
//               <FormControlLabel
//                 value="cod"
//                 control={<Radio />}
//                 label="Thanh toán khi nhận hàng"
//               />
//               <FormControlLabel
//                 value="bank"
//                 control={<Radio />}
//                 label="Chuyển khoản online"
//               />
//             </RadioGroup>

//             {paymentMethod === "bank" && (
//               <Box sx={{ mt: 4, p: 3, borderRadius: 2, bgcolor: "#f0f0f0" }}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Thông tin chuyển khoản
//                 </Typography>
//                 <Typography variant="body2">
//                   Chủ tài khoản: Nguyen Van A
//                 </Typography>
//                 <Typography variant="body2">
//                   Số điện thoại Momo: 123456789
//                 </Typography>
//                 <Typography variant="body2">Ngân Hàng: ABC Bank</Typography>
//                 <Box display="flex" justifyContent="center" gap={2} mt={3}>
//                   <img src={Qrcodeme} alt="QR Code 1" width={180} />
//                   <img src={Qrcodeme} alt="QR Code 2" width={180} />
//                 </Box>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="secondary">
//               Hủy Bỏ
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => alert("Đơn hàng đã được đặt!")}
//             >
//               Xác Nhận
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Box>
//   );
// }
