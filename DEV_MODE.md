# Dev Mode - Login Bypass Guide

## Cách vượt qua màn login để test các trang khác

### Cách 1: Sử dụng Dev Mode Button (Khuyên dùng) ✅

1. Vào trang login: `http://localhost:5174/login`
2. Cuộn xuống dưới cùng, bạn sẽ thấy nút:
   ```
   🔧 Dev Mode - Bypass Login
   ```
3. Nhấp nút này → Tự động đăng nhập và đưa bạn vào Dashboard

### Cách 2: Sử dụng Console (Nếu quên nhấp nút)

1. Mở Developer Tools: `F12`
2. Vào tab `Console`
3. Copy & Paste code dưới đây:

```javascript
const mockUser = {
  id: "dev-001",
  username: "admin",
  email: "admin@vsmartpay.com",
  firstName: "Admin",
  lastName: "User",
  gender: "M",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBlq8RyfY-Sza4GTaSJpN8e-FG3qJ0MQgmnjCdyUa_AXOhOFTDrRm04L6ZtRwYwjQtn00hxSyNiloL7o_ltMjdic_COsAxpU8UA1igqnmUO6pqrkpSwxL9c6tIKHQrOnSQIMwDU7R0ryWgZBsaCh3ew66YtHROXnThMtGBWZaO9OBqaQj2d-NyPxrpz-6mFfe_3aLJd2RlZA8OgHncwbcY-tGewvCcuxelK2kX90vs4QJh5YKMrFxFcHk3cdTYkhDVGpTdMpkO60TI",
};

localStorage.setItem("accessToken", "dev-token-12345");
localStorage.setItem("refreshToken", "dev-refresh-token-12345");
localStorage.setItem("user", JSON.stringify(mockUser));

window.location.reload();
```

4. Nhấn Enter → Trang sẽ reload và bạn đã đăng nhập

### Cách 3: Xóa Dev Bypass (Khi muốn logout)

Chạy code này trong Console:

```javascript
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
localStorage.removeItem("user");
window.location.reload();
```

---

## 📍 Routes Có Sẵn

Sau khi bypass login, bạn có thể truy cập các trang:

| Route               | Tên Trang         |
| ------------------- | ----------------- |
| `/dashboard`        | Tổng quan         |
| `/support-requests` | Yêu cầu hỗ trợ    |
| `/chat-sessions`    | Phiên chat        |
| `/knowledge-base`   | Kho tri thức      |
| `/reports`          | Báo cáo & Cài đặt |
| `/settings`         | Cài đặt           |

---

## 📝 Thông tin Dev Account

**Username:** admin  
**Email:** admin@vsmartpay.com  
**Password:** (Không cần vì là dev mode)

---

## ⚙️ Cách Dev Mode hoạt động

- Dev Mode **CHỈ** hiển thị khi chạy `npm run dev`
- Dev Mode **KHÔNG** có trong production build (`npm run build`)
- Sử dụng `import.meta.env.DEV` để kiểm tra môi trường

---

## 🔗 Liên kết nhanh

- Dev Server: http://localhost:5174
- Dashboard: http://localhost:5174/dashboard
- Support: http://localhost:5174/support-requests
- Settings: http://localhost:5174/settings
