import Image from "next/image";
import { MenuData } from "@/lib/types";
import MenuSection from "@/components/MenuSection";
import FloatingCTA from "@/components/FloatingCTA";
import {
    RESTAURANT_NAME,
    RESTAURANT_TAGLINE,
    getZaloUrl,
    getTelUrl,
    DEFAULT_MAPS_URL,
} from "@/lib/utils";

export const runtime = "edge";

async function getMenuData(): Promise<MenuData | null> {
    const apiUrl = process.env.MENU_API_URL;

    if (!apiUrl) {
        console.error("MENU_API_URL is not set");
        return null;
    }

    try {
        const res = await fetch(apiUrl, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch menu: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching menu:", error);
        return null;
    }
}

export default async function HomePage() {
    const menuData = await getMenuData();
    const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL || DEFAULT_MAPS_URL;

    const meta = menuData?.meta || {
        hotline: "0386983357",
        address: "146 Phùng Khoang - Đại Mỗ - HN",
        time_open: "07:00",
        time_close: "22:00",
        note_xoi_default: "",
    };

    return (
        <main className="min-h-screen pb-24 md:pb-8">
            {/* Compact Header */}
            <header className="sticky top-0 z-50 glass border-b border-amber-100/50">
                <div className="max-w-2xl mx-auto px-3 py-2.5">
                    <div className="flex items-center justify-between gap-2">
                        {/* Logo + Name */}
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex-shrink-0">
                                <Image
                                    src="/logo.png"
                                    alt={RESTAURANT_NAME}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="min-w-0">
                                <h1 className="font-heading text-sm sm:text-lg font-bold text-gray-900 leading-tight truncate">
                                    {RESTAURANT_NAME}
                                </h1>
                                <p className="text-xs text-amber-600 font-medium hidden sm:block">
                                    {RESTAURANT_TAGLINE}
                                </p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                            <a
                                href={getTelUrl(meta.hotline)}
                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500 text-white shadow-md hover:bg-amber-600 transition-colors"
                                title="Gọi đặt món"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                            </a>
                            <a
                                href={getZaloUrl(meta.hotline)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors"
                                title="Chat Zalo"
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/61573438988182"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
                                title="Facebook"
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Info Bar */}
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-100/50">
                <div className="max-w-2xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-center gap-4 sm:gap-8 text-sm">
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-gray-700 hover:text-amber-700 transition-colors"
                        >
                            <svg
                                className="w-4 h-4 text-amber-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span className="font-medium">{meta.address}</span>
                        </a>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1.5 text-gray-700">
                            <svg
                                className="w-4 h-4 text-green-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="font-medium">
                                {meta.time_open} - {meta.time_close}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            {menuData ? (
                <MenuSection
                    items={menuData.items}
                    toppings={menuData.toppings}
                    meta={menuData.meta}
                />
            ) : (
                <section className="px-4 py-12">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="card p-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-red-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                Không thể tải menu
                            </h2>
                            <p className="text-gray-500 mb-4">
                                Vui lòng gọi điện để đặt món
                            </p>
                            <a
                                href={getTelUrl(meta.hotline)}
                                className="btn-primary"
                            >
                                Gọi {meta.hotline}
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* Shipping Notice - Highlighted */}
            <section className="px-4 py-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-5 shadow-md shadow-amber-100">
                        <h3 className="font-heading text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                            <span className="text-2xl">📦</span> Lưu ý khi đặt
                            ship
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                                    1
                                </span>
                                <span>
                                    Phí ship khách thanh toán theo giá quán book
                                    trên app (quán sẽ báo trước), hoặc có thể tự
                                    book ship.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                                    2
                                </span>
                                <span>
                                    Đơn sẽ book ship ngay sau khi quý khách
                                    thanh toán tiền đồ ăn.
                                </span>
                            </li>
                        </ul>
                        <p className="mt-4 pt-4 border-t border-amber-200 text-center text-sm text-amber-700 font-medium">
                            ✨ Quán rất vui được phục vụ bạn! 💛
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer - Minimal */}
            <footer className="px-4 py-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <a
                            href={getTelUrl(meta.hotline)}
                            className="text-gray-500 hover:text-amber-600 transition-colors"
                            title="Gọi điện"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                        </a>
                        <a
                            href={getZaloUrl(meta.hotline)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-500 transition-colors"
                            title="Zalo"
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                            </svg>
                        </a>
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-green-600 transition-colors"
                            title="Chỉ đường"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://www.facebook.com/61573438988182"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                            title="Facebook"
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                    </div>
                    <p className="text-xs text-gray-400">
                        © 2024 {RESTAURANT_NAME}
                    </p>
                </div>
            </footer>

            {/* Floating CTA for mobile */}
            <FloatingCTA hotline={meta.hotline} />
        </main>
    );
}
