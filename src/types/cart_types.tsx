//Structure




type Discount = {
    code: string;
    type: "AMOUNT" | "PERCENTAGE"
    amount: number;
};


type Attributes = {
    color?: string;
    storage?: string;
    ram?: number;
}


export type CartItem = {
    productId: string;
    skuId: string;
    title?: string;
    imageUrl: string;
    qty: number;
    unitPrice?: number;
    listPrice?: number;
    taxRate?: number;
    discounts: Discount[];
    // attributes: Record<string, string>; // e.g., { color: "Space Black", storage: "128GB" }
    attributes?: Attributes;
    addedAt: Date;
    updatedAt: Date;
};


type ShippingMethod = {
    code: string;
    price: number;
};

type ShippingAddress = {
    address: string;
    house_Number: string;
    city: string;
    country: string;
    postalCode: string;
};

export type Cart_Template = {
    _id?: string; // ObjectId as string
    userId: string;
    sessionId: string;
    status: "active" | "ordered" | "abandoned";
    currency: string;
    items: CartItem[];
    coupon?: Discount;
    shippingMethod?: ShippingMethod;
    shippingAddress?: ShippingAddress;
    subtotal: number;
    taxTotal: number;
    shippingTotal: number;
    discountTotal: number;
    grandTotal: number;
    version: number;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
};


//Cart Sum
export type CartPrices = {
    subtotal?: number;
    taxTotal?: number;
    shippingTotal?: number;
    discountTotal?: number;
    grandTotal?: number;
}


