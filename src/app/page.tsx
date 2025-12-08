import Image from "next/image";
import { MenuData } from "@/lib/types";
import MenuSection from "@/components/MenuSection";
import FloatingContact from "@/components/FloatingCTA";
import {
    RESTAURANT_NAME,
    RESTAURANT_TAGLINE,
    DEFAULT_MAPS_URL,
    getTelUrl,
    getZaloUrl,
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
    const mapsUrl1 =
        process.env.NEXT_PUBLIC_MAPS_URL1 ||
        process.env.NEXT_PUBLIC_MAPS_URL ||
        DEFAULT_MAPS_URL;
    const mapsUrl2 = process.env.NEXT_PUBLIC_MAPS_URL2 || "";

    const meta = menuData?.meta || {
        hotline: "0386983357",
        address:
            "146 P. Phùng Khoang, P. Văn Quán, Nam Từ Liêm, Hà Nội, Việt Nam",
        address1: "Cơ sở 1: 146 P. Phùng Khoang, Văn Quán, Nam Từ Liêm, Hà Nội",
        address2: "Cơ sở 2: 259 Đ. Nguyễn Khang, Yên Hoà, Cầu Giấy, Hà Nội",
        time_open: "07:00",
        time_close: "22:00",
        note_xoi_default: "",
    };

    // Get addresses
    const address1 = meta.address1 || meta.address;
    const address2 = meta.address2;

    return (
        <main className="min-h-screen pb-8">
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

                        {/* Quick Actions: Maps + Facebook */}
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                            {/* Facebook */}
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
                            {/* Map button 1 */}
                            <a
                                href={mapsUrl1}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md hover:from-amber-600 hover:to-orange-700 transition-all"
                                title="Cơ sở 1 - Phùng Khoang"
                            >
                                <svg
                                    className="w-4 h-4 animate-bounce-subtle"
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
                                <span className="text-xs font-bold">1</span>
                            </a>
                            {/* Map button 2 */}
                            {mapsUrl2 && (
                                <a
                                    href={mapsUrl2}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md hover:from-orange-600 hover:to-red-600 transition-all"
                                    title="Cơ sở 2 - Nguyễn Khang"
                                >
                                    <svg
                                        className="w-4 h-4 animate-bounce-subtle"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        style={{ animationDelay: "0.3s" }}
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
                                    <span className="text-xs font-bold">2</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Info Bar - Addresses & Time */}
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-100/50">
                <div className="max-w-2xl mx-auto px-4 py-3">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
                        {/* Addresses */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                            <a
                                href={mapsUrl1}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-gray-700 hover:text-amber-700 transition-colors"
                            >
                                <svg
                                    className="w-4 h-4 text-amber-500 flex-shrink-0"
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
                                <span className="font-medium text-xs sm:text-sm">
                                    {address1}
                                </span>
                            </a>
                            {address2 && (
                                <>
                                    <span className="text-gray-300 hidden sm:inline">
                                        |
                                    </span>
                                    <a
                                        href={mapsUrl2}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-gray-700 hover:text-amber-700 transition-colors"
                                    >
                                        <svg
                                            className="w-4 h-4 text-orange-500 flex-shrink-0"
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
                                        <span className="font-medium text-xs sm:text-sm">
                                            {address2}
                                        </span>
                                    </a>
                                </>
                            )}
                        </div>
                        <span className="text-gray-300 hidden sm:inline">
                            |
                        </span>
                        {/* Time */}
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
                                {meta.time_open} & {meta.time_close}
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
                            className="hover:opacity-70 transition-opacity"
                            title="Zalo"
                        >
                            <Image
                                src="/zalo.svg"
                                alt="Zalo"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                        </a>
                        <a
                            href={mapsUrl1}
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

            {/* Floating Contact Buttons */}
            <FloatingContact hotline={meta.hotline} />
        </main>
    );
}
