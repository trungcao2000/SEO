import axios from "axios";

// Hàm tạo tên file ngẫu nhiên dựa trên thời gian hiện tại
const generateFileName = () => {
  const now = new Date();
  const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}_${now
    .getHours()
    .toString()
    .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  return `image_${formattedDate}`;
};

// Hàm upload file và trả về URL
const handleUpload = async (file) => {
  if (!file) {
    alert("Chọn ảnh trước!");
    return null;
  }

  const fileExtension = file.name.split(".").pop();
  const randomFileName = `${generateFileName()}.${fileExtension}`;
  const renamedImage = new File([file], randomFileName, { type: file.type });

  const formData = new FormData();
  formData.append("image", renamedImage);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=1101242cd11f5b2c50cacc731852c95c`,
      formData
    );
    const imageUrl = response.data.data.url;
    console.log("Upload thành công:", imageUrl);
    return imageUrl;
  } catch (err) {
    console.error("Upload thất bại:", err);
    alert("Lỗi upload!");
    return null;
  }
};

export default handleUpload;
