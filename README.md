# FURNI - ECOMMERCE FRONTEND

Đây là giao diện người dùng (Frontend) cho dự án thương mại điện tử **FURNI**, xây dựng với **Next.js** và **Tailwind CSS**.

API chính được cung cấp bởi backend Node.js / Express (repo [furni_e-commerce-api](https://github.com/theanhtran18/furni_e-commerce-api)).

---

## Technology Stack

- **Next.js** (React)
- **Tailwind CSS**
- **Redux Toolkit**
- **JWT Authentication**
- **Google OAuth**

---

## Installation

```bash
git clone https://github.com/theanhtran18/furni_e-commerce.git
cd furni_e-commerce
npm install
```

## Environment Variables

Tạo file .env.local từ .env.local.example

```bash
# API base URL của backend
NEXT_PUBLIC_API_BASE=http://localhost:5000/api

# Google OAuth Client ID
NEXT_PUBLIC_GG_CLIENT_ID=your_google_client_id
```

## Run the project

```bash
npm run dev
```

Ứng dụng sẽ chạy tại http://localhost:3000

## Backend API

Đảm bảo backend chạy song song
[furni_e-commerce-api](https://github.com/theanhtran18/furni_e-commerce-api)

## License

**MIT License.**

## Author

**Trần Thế Anh**
