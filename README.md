# V-Smart Pay - CSKH Web Admin Dashboard

Hệ thống quản trị Web (Admin Dashboard) chuyên dụng dành cho nhân viên chăm sóc khách hàng (CSKH) và quản trị viên của **V-Smart Pay**. Ứng dụng hỗ trợ theo dõi hiệu suất, quản lý các yêu cầu hỗ trợ, giám sát AI Chatbot và tiếp quản phiên chat trực tiếp (Human Takeover).

---

## 🚀 Tính Năng Chính

1. **Tổng Quan Hệ Thống (Dashboard)**:
   - Thống kê thời gian thực về số lượng yêu cầu hỗ trợ, trạng thái các cuộc hội thoại.
   - Biểu đồ xu hướng và báo cáo hiệu suất của bộ phận CSKH.

2. **Quản Lý Yêu Cầu Hỗ Trợ (Support Requests)**:
   - Tiếp nhận danh sách yêu cầu cần xử lý từ phía người dùng.
   - Cập nhật trạng thái xử lý, gán nhân viên phụ trách và theo dõi tiến độ sự cố.

3. **Quản Lý Phiên Chat (Chat Sessions) & Human Takeover**:
   - Giám sát toàn bộ phiên trò chuyện giữa khách hàng và **Trợ thủ AI**.
   - Hỗ trợ tính năng **Human Takeover** (nhân viên CSKH trực tiếp nhảy vào chat thay thế AI khi hệ thống chuyển giao hoặc khách hàng yêu cầu gặp tư vấn viên).
   - Lưu trữ lịch sử đoạn chat chi tiết của từng phiên.

4. **Quản Lý Kho Tri Thức (Knowledge Base)**:
   - Giao diện quản lý các nguồn tài liệu tri thức (RAG - Retrieval-Augmented Generation).
   - Cho phép thêm mới, chỉnh sửa và phân tích tài liệu để huấn luyện/cập nhật thông tin trả lời cho AI Chatbot trên ứng dụng di động.

5. **Thiết Lập Hệ Thống (Settings)**:
   - Quản lý thông tin tài khoản, cấu hình tham số hệ thống và phân quyền.

---

## 🛠️ Công Nghệ Sử Dụng

- **Core**: React 19 & Vite 7 (TypeScript)
- **State Management**: Redux Toolkit & React Redux
- **API Cache & Sync**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **UI Framework**: [Ant Design (antd v6)](https://ant.design/) làm giao diện hiển thị chuyên nghiệp.
- **Styling**: Tailwind CSS v4 cho phong cách hiện đại và linh hoạt.
- **HTTP Client**: Axios tích hợp cơ chế tự động quản lý Access Token / Refresh Token.
- **Đa ngôn ngữ**: `i18next` & `react-i18next`.

---

## 🔧 Chế Độ Phát Triển (Dev Mode Bypass)

Để tạo điều kiện test nhanh giao diện frontend mà không phụ thuộc vào trạng thái API Backend:
- Một nút **🔧 Dev Mode - Bypass Login** hiển thị dưới chân trang đăng nhập (`/login`).
- Khi nhấp vào nút này, hệ thống tự động lưu token dev vào LocalStorage và chuyển hướng thẳng vào Dashboard.
- **Lưu ý**: Nút này chỉ xuất hiện ở chế độ Local Development (`npm run dev`) và tự động bị loại bỏ hoàn toàn trong Production build (`npm run build`).
- Xem chi tiết tại [DEV_MODE.md](file:///d:/VinFast/VSF/Fintech/Industry/VSmartPay-CSKH-Web-Admin-Dashboard/DEV_MODE.md).

---

## 🏃 Hướng Dẫn Khởi Chạy Dự Án

### Cách 1: Chạy trực tiếp trên máy local
1. **Cài đặt dependencies**:
   ```bash
   npm install
   ```
2. **Khởi chạy dev server**:
   ```bash
   npm run dev
   ```
   *Mặc định dev server sẽ chạy tại địa chỉ: `http://localhost:5173` hoặc `http://localhost:5174`*

---

### Cách 2: Chạy bằng Docker (Khuyên dùng) 🐳
Dự án được cấu hình sẵn môi trường Docker Compose để đơn giản hóa quá trình khởi chạy và cài đặt.

#### 1. Lần đầu khởi chạy dự án (Build & Up):
Chạy câu lệnh dưới đây để build image và chạy container:
```bash
docker compose -f docker/docker-compose.dev.yml up --build
```
*Sau đó, bạn có thể mở Docker Desktop để theo dõi trạng thái container.*

#### 2. Tắt dự án:
- **Tắt tạm thời**: Chọn container trên Docker Desktop rồi ấn Stop. Hoặc chạy lệnh `docker compose -f docker/docker-compose.dev.yml stop`.
- **Tắt và xóa container**:
  ```bash
  docker compose -f docker/docker-compose.dev.yml down
  ```

#### 3. Mở lại sau khi tắt:
- **Nếu chỉ tắt máy/tắt Docker Desktop (chưa down)**:
  - Cách 1 (Dễ nhất): Mở Docker Desktop -> click nút **Start** ở container frontend.
  - Cách 2 (Terminal):
    ```bash
    docker compose -f docker/docker-compose.dev.yml up
    ```
- **Nếu đã chạy lệnh `down` trước đó (container đã bị xóa)**:
  Bắt buộc phải chạy lại lệnh khởi tạo:
  ```bash
  docker compose -f docker/docker-compose.dev.yml up
  ```

#### 4. Quản lý thư viện (NPM Packages) trong Docker:
Khi container đang chạy, muốn cài/gỡ thư viện mà không cần cài local:
- **Cài đặt thư viện mới**:
  ```bash
  docker compose -f docker/docker-compose.dev.yml exec frontend npm install "tên-thư-viện"
  ```
- **Gỡ cài đặt thư viện**:
  ```bash
  docker compose -f docker/docker-compose.dev.yml exec frontend npm uninstall "tên-thư-viện"
  ```
- **Khi pull code mới từ Git có cập nhật package.json**:
  ```bash
  docker compose -f docker/docker-compose.dev.yml down
  docker compose -f docker/docker-compose.dev.yml up --build
  ```

---

## 📁 Cấu Trúc Thư Mục

```txt
VSmartPay-CSKH-Web-Admin-Dashboard/
├── docker/                   # Cấu hình Dockerfile & docker-compose cho dev/prod
├── public/                   # Thư mục chứa asset tĩnh (logo, favicon...)
├── src/                      # Source code chính của ứng dụng
│   ├── assets/               # Hình ảnh, font chữ nội bộ
│   ├── common/               # Guards (AuthGuard, GuestGuard), hooks & utils dùng chung
│   ├── components/           # UI Component dùng chung (Layout, Sidebar, Header...)
│   ├── config/               # Cấu hình Routing (AppRouter.tsx), Axios, QueryClient
│   ├── constants/            # Các định nghĩa hằng số, danh mục enums
│   ├── features/             # Các module tính năng độc lập
│   │   ├── auth/             # Logic xác thực
│   │   ├── chat-sessions/    # Quản lý phiên chat & Human Takeover
│   │   ├── dashboard/        # Báo cáo tổng quan số liệu
│   │   ├── knowledge-base/   # Quản lý tài liệu RAG
│   │   ├── login/            # Màn hình đăng nhập & Dev Bypass
│   │   ├── reports/          # Báo cáo chi tiết hiệu suất CSKH
│   │   ├── settings/         # Cài đặt cấu hình hệ thống
│   │   └── support-requests/ # Quản lý & gán việc sự cố/yêu cầu hỗ trợ
│   ├── i18n/                 # Cấu hình đa ngôn ngữ (vi, en...)
│   ├── redux/                # Cấu hình Redux store & slices cho global state
│   ├── service/              # Lớp giao tiếp API
│   ├── index.css             # CSS chính tích hợp Tailwind v4
│   └── main.tsx              # Điểm khởi đầu của ứng dụng React
```
