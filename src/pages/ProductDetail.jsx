import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Button,
} from "@mui/material";
import products from "./products"; // Đảm bảo import đúng mảng sản phẩm

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          Sản phẩm không tồn tại.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ height: 300, objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Giá: {product.price.toLocaleString()} VND
          </Typography>
          <Typography variant="body1">
            Mô tả sản phẩm sẽ hiển thị tại đây. (Cập nhật chi tiết theo dữ liệu
            thật)
          </Typography>
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: "12px", textTransform: "none", m: 2 }}
        >
          Mua ngay
        </Button>
      </Card>
    </Container>
  );
}

export default ProductDetail;
