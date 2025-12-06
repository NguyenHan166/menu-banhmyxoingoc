import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#f59e0b",
};

export const metadata: Metadata = {
    title: "Bánh mì và xôi Ngọc - Ngon Sạch Rẻ | 146 Phùng Khoang",
    description:
        "Bánh mì, xôi ngon tại 146 Phùng Khoang, Đại Mỗ, Hà Nội. Mở cửa 07:00-22:00. Gọi 0386983357 để đặt món!",
    keywords: [
        "bánh mì",
        "xôi",
        "Phùng Khoang",
        "Đại Mỗ",
        "Hà Nội",
        "ăn sáng",
        "giao hàng",
    ],
    authors: [{ name: "Bánh mì và xôi Ngọc" }],
    openGraph: {
        title: "Bánh mì và xôi Ngọc - Ngon Sạch Rẻ",
        description:
            "Bánh mì, xôi ngon tại 146 Phùng Khoang, Đại Mỗ, Hà Nội. Mở cửa 07:00-22:00.",
        type: "website",
        locale: "vi_VN",
        siteName: "Bánh mì và xôi Ngọc",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/logo.png" type="image/png" />
            </head>
            <body className="antialiased" suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
