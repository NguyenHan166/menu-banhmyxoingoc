# Bánh Mỳ Xôi Ngọc - Website

Website landing page và menu cho quán Bánh Mỳ Xôi Ngọc, được build bằng Next.js 14 và deploy trên Cloudflare Pages.

## 🚀 Tính năng

-   **Landing Page**: Hiển thị thông tin quán, giờ mở cửa, và các nút CTA
-   **Menu Page**: Hiển thị menu từ API, search, sticky category nav
-   **Mobile-first**: Thiết kế tối ưu cho mobile
-   **Edge Runtime**: Tương thích Cloudflare Pages
-   **SEO Ready**: Metadata và OpenGraph đầy đủ

## 📋 Yêu cầu

-   Node.js 18+
-   npm hoặc yarn

## 🛠️ Cài đặt và chạy local

### 1. Clone và cài dependencies

```bash
cd menungoc
npm install
```

### 2. Tạo file environment

```bash
cp .env.example .env.local
```

Chỉnh sửa `.env.local`:

```env
MENU_API_URL=https://apimenu.nguyenvanhan.io.vn/api/menu
NEXT_PUBLIC_MAPS_URL=https://maps.google.com/?q=146+Phung+Khoang,+Dai+Mo,+Ha+Noi
```

### 3. Chạy dev server

```bash
npm run dev
```

Mở http://localhost:3000

## 🏗️ Build

```bash
npm run build
```

## ☁️ Deploy lên Cloudflare Pages

### 1. Tạo project trên Cloudflare Pages

1. Đăng nhập [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vào **Workers & Pages** → **Create application** → **Pages**
3. Connect Git repository hoặc Direct Upload

### 2. Cấu hình Build

| Setting                    | Value                           |
| -------------------------- | ------------------------------- |
| **Framework preset**       | Next.js                         |
| **Build command**          | `npx @cloudflare/next-on-pages` |
| **Build output directory** | `.vercel/output/static`         |
| **Root directory**         | `/` (hoặc path đến project)     |
| **Node.js version**        | 18                              |

### 3. Environment Variables

Trong **Settings** → **Environment variables**, thêm:

| Variable               | Scope                | Value                                         |
| ---------------------- | -------------------- | --------------------------------------------- |
| `MENU_API_URL`         | Production & Preview | `https://apimenu.nguyenvanhan.io.vn/api/menu` |
| `NEXT_PUBLIC_MAPS_URL` | Production & Preview | Link Google Maps của quán                     |
| `NODE_VERSION`         | Production & Preview | `18`                                          |

### 4. Compatibility flags

Trong **Settings** → **Functions** → **Compatibility flags**, thêm:

-   `nodejs_compat`

### 5. Deploy

Click **Save and Deploy**. Cloudflare sẽ tự động build và deploy.

## 🌐 Custom Domain

1. Vào **Custom domains** → **Set up a custom domain**
2. Nhập domain (ví dụ: `menu.example.com`)
3. Thêm CNAME record trong DNS:
    ```
    CNAME  menu  your-project.pages.dev
    ```

## 📱 Tạo QR Code cho Menu

Sau khi deploy, tạo QR code cho URL `/menu`:

-   https://yourdomain.com/menu

Có thể dùng script có sẵn trong project hoặc các tool online.

## 📁 Cấu trúc thư mục

```
menungoc/
├── public/
│   └── logo.png           # Logo quán
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout + SEO
│   │   ├── page.tsx       # Landing page
│   │   └── menu/
│   │       └── page.tsx   # Menu page (Edge runtime)
│   ├── components/
│   │   ├── CategoryNav.tsx
│   │   ├── CTABar.tsx
│   │   ├── MenuContent.tsx
│   │   ├── SearchInput.tsx
│   │   └── ToppingsSection.tsx
│   └── lib/
│       ├── types.ts       # TypeScript interfaces
│       └── utils.ts       # Helper functions
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
├── wrangler.toml
└── package.json
```

## 🔧 Scripts

| Script                | Mô tả                      |
| --------------------- | -------------------------- |
| `npm run dev`         | Chạy dev server            |
| `npm run build`       | Build production           |
| `npm run pages:build` | Build cho Cloudflare Pages |
| `npm run preview`     | Preview build locally      |
| `npm run deploy`      | Deploy lên Cloudflare      |

## 📄 License

MIT
