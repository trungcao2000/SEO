// firebaseService.js
import { database } from "../firebase";
import { ref, set, get, update, remove, onValue } from "firebase/database";
import bcrypt from "bcryptjs";

// 📝 Đọc dữ liệu (Items)
export const readItems = (callback, name) => {
  const ItemsRef = ref(database, name);
  onValue(
    ItemsRef,
    (snapshot) => {
      if (typeof callback === "function") {
        callback(snapshot.exists() ? snapshot.val() : {});
      } else {
        console.error("Lỗi: callback không phải là một hàm!");
      }
    },
    { onlyOnce: true } // Chỉ đọc một lần, tránh lặp vô hạn
  );
};

// ➕ Thêm
export const addItem = async (id, Item, name) => {
  const itemRef = ref(database, `${name}/${id}`);
  const snapshot = await get(itemRef);

  if (snapshot.exists()) {
    throw new Error(`ID "${id}" đã tồn tại. Vui lòng chọn ID khác.`);
  }

  return set(itemRef, Item);
};
// ✏️ Sửa
export const updateItem = (id, updatedItem, name) => {
  return update(ref(database, `${name}/${id}`), updatedItem);
};

// 🗑️ Xóa
export const deleteItem = (id, name) => {
  return remove(ref(database, `${name}/${id}`));
};

// 📌 Lấy thông tin user từ Firebase
export const getUserProfile = async (phone) => {
  try {
    const userRef = ref(database, `users/${phone}`);
    const snapshot = await get(userRef);

    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error("Lỗi lấy thông tin user:", error.message);
    return null;
  }
};

// ✏️ Cập nhật thông tin user (chỉ cập nhật name, adress)
export const updateUserProfile = async (phone, updatedData) => {
  try {
    const userRef = ref(database, `users/${phone}`);
    await update(userRef, updatedData);
  } catch (error) {
    console.error("Lỗi cập nhật user:", error.message);
    throw error;
  }
};
// Thư viện mã hóa mật khẩu
export const registerUser = async (creatUser) => {
  try {
    const userRef = ref(database, `users/${creatUser.phone}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      throw new Error("Số điện thoại đã được đăng ký!");
    }

    const hashedPassword = await bcrypt.hash(creatUser.pass, 10);

    await set(userRef, {
      id: creatUser.phone, // Dùng phone làm ID
      name: creatUser.name,
      phone: creatUser.phone,
      pass: hashedPassword,
      adress: creatUser.adress, // Địa chỉ
    });

    return "Đăng ký thành công!";
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    throw error;
  }
};

// 🔑 Đăng nhập bằng số điện thoại & mật khẩu
export const loginUser = async (phone, pass) => {
  try {
    const userRef = ref(database, `users/${phone}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      throw new Error("Số điện thoại chưa được đăng ký!");
    }

    const userData = snapshot.val();
    const passwordMatch = await bcrypt.compare(pass, userData.pass);

    if (!passwordMatch) {
      throw new Error("Mật khẩu không chính xác!");
    }

    return userData;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message);
    throw error;
  }
};
