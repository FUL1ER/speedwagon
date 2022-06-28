import { ProductPrice } from "../../types/types";

export const producer: Array<{ name: string }> = [
    { name: "Apple" },
    { name: "ASUS" },
    { name: "Acer" },
    { name: "HP" },
    { name: "Lenovo" },
    { name: "Samsung" },
    { name: "Dell" },
    { name: "Canon" },
    { name: "TP-LINK" },
    { name: "Logitech" }
];

export const gender: Array<{ name: string }> = [{ name: "pc" }, { name: "mobile" }];

export const price: Array<ProductPrice> = [
    { id: 1, name: "Будь-яка", array: [1, 9999999] },
    { id: 2, name: "0 - 100 грн.", array: [0, 100] },
    { id: 3, name: "101 - 500 грн.", array: [101, 500] },
    { id: 4, name: "501 - 1000 грн.", array: [501, 1000] },
    { id: 5, name: "1001 - 100000 грн.", array: [1001, 100000] }
];
