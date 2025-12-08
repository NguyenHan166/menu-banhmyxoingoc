// TypeScript interfaces for Menu API response

export interface MenuItem {
    id: string;
    category: string;
    name: string;
    price: number;
    description: string;
    available: boolean;
    sort: number;
}

export interface Topping {
    id: string;
    name: string;
    price: number;
    available: boolean;
    sort: number;
}

export interface MenuMeta {
    note_xoi_default: string;
    hotline: string;
    address: string; // backward compatibility
    address1?: string; // cơ sở 1
    address2?: string; // cơ sở 2
    time_open: string;
    time_close: string;
}

export interface MenuData {
    updatedAt: string;
    meta: MenuMeta;
    items: MenuItem[];
    toppings: Topping[];
}

// Grouped menu items by category
export interface GroupedMenuItems {
    [category: string]: MenuItem[];
}
