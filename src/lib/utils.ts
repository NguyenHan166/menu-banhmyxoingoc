/**
 * Extracts only digits from a phone number string
 * @param phone - Phone number that may contain dots, dashes, spaces
 * @returns Phone number with only digits
 */
export function getPhoneDigits(phone: string): string {
    return phone.replace(/\D/g, "");
}

/**
 * Formats a price in VND currency
 * @param price - Price in VND (integer)
 * @returns Formatted string like "25.000đ"
 */
export function formatVND(price: number): string {
    return price.toLocaleString("vi-VN") + "đ";
}

/**
 * Formats a date string to DD/MM/YYYY format (server-safe, no locale issues)
 * @param dateStr - ISO date string
 * @returns Formatted date like "06/12/2025"
 */
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Generates a Zalo chat URL from phone number
 * @param phone - Phone number (will extract digits)
 * @returns Zalo URL like "https://zalo.me/0386983357"
 */
export function getZaloUrl(phone: string): string {
    return `https://zalo.me/${getPhoneDigits(phone)}`;
}

/**
 * Generates a tel: URL for making calls
 * @param phone - Phone number (will extract digits)
 * @returns Tel URL like "tel:0386983357"
 */
export function getTelUrl(phone: string): string {
    return `tel:${getPhoneDigits(phone)}`;
}

/**
 * Groups menu items by category
 */
export function groupByCategory<T extends { category: string }>(
    items: T[]
): Record<string, T[]> {
    return items.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}

/**
 * Constants for the restaurant
 */
export const RESTAURANT_NAME = "Bánh mì và xôi Ngọc";
export const RESTAURANT_TAGLINE = "Ngon - Sạch - Rẻ";

/**
 * Default Google Maps URL fallback
 */
export const DEFAULT_MAPS_URL =
    "https://maps.google.com/?q=146+Phung+Khoang,+Dai+Mo,+Ha+Noi";
