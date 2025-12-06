"use client";

import { useState, useMemo } from "react";
import { MenuItem, Topping, MenuMeta } from "@/lib/types";
import { formatVND } from "@/lib/utils";

interface MenuSectionProps {
    items: MenuItem[];
    toppings: Topping[];
    meta: MenuMeta;
}

export default function MenuSection({
    items,
    toppings,
    meta,
}: MenuSectionProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter available items
    const availableItems = useMemo(
        () =>
            items
                .filter((item) => item.available)
                .sort((a, b) => a.sort - b.sort),
        [items]
    );

    // Get unique categories in order
    const categories = useMemo(() => {
        const seen = new Set<string>();
        return availableItems
            .map((item) => item.category)
            .filter((cat) => {
                if (seen.has(cat)) return false;
                seen.add(cat);
                return true;
            });
    }, [availableItems]);

    // Set default active category
    useMemo(() => {
        if (categories.length > 0 && !activeCategory) {
            setActiveCategory(categories[0]);
        }
    }, [categories, activeCategory]);

    // Filter items
    const filteredItems = useMemo(() => {
        let result = availableItems;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(
                (item) =>
                    item.name.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query)
            );
        } else if (activeCategory) {
            result = result.filter((item) => item.category === activeCategory);
        }

        return result;
    }, [availableItems, searchQuery, activeCategory]);

    const availableToppings = toppings
        .filter((t) => t.available)
        .sort((a, b) => a.sort - b.sort);

    return (
        <section id="menu" className="px-4 py-6">
            <div className="max-w-2xl mx-auto">
                {/* Search + Category in same row on larger screens */}
                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                    {/* Search */}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Tìm món..."
                            className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Tabs - Horizontal scroll */}
                {!searchQuery && (
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                    activeCategory === category
                                        ? "bg-amber-500 text-white shadow-md"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-700"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                {/* Note for XÔI - Compact */}
                {activeCategory === "XÔI" &&
                    meta.note_xoi_default &&
                    !searchQuery && (
                        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2">
                            <span className="text-lg">💡</span>
                            <p className="text-sm text-amber-800">
                                {meta.note_xoi_default}
                            </p>
                        </div>
                    )}

                {/* Menu Items - Compact list */}
                <div className="space-y-2">
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">
                                Không tìm thấy món &quot;{searchQuery}&quot;
                            </p>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="mt-2 text-amber-600 font-medium text-sm hover:text-amber-700"
                            >
                                Xóa tìm kiếm
                            </button>
                        </div>
                    ) : (
                        filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="menu-item bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-center gap-3 hover:border-amber-200 hover:shadow-sm transition-all"
                                style={{ animationDelay: `${index * 0.03}s` }}
                            >
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm">
                                        {item.name}
                                    </h3>
                                    {item.description && (
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                                <span className="font-bold text-amber-600 text-base whitespace-nowrap">
                                    {formatVND(item.price)}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                {/* Toppings - Inline chips */}
                {availableToppings.length > 0 && !searchQuery && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-semibold text-gray-700">
                                🧀 Thêm topping:
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {availableToppings.map((topping) => (
                                <span
                                    key={topping.id}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-sm"
                                >
                                    <span className="text-gray-700">
                                        {topping.name}
                                    </span>
                                    <span className="text-amber-600 font-semibold">
                                        +{formatVND(topping.price)}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
