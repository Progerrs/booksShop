import dayjs from "dayjs";
import type { Shop } from "../../types";

export const COFFEBEAN: Shop = {
    id: 1,
    name: "Пятерочка",
    address: "ул. Фязов, д.14",
    deliveryAt: dayjs().add(14, "days").toISOString(),
};

export const COFFESHOP_COMPANY: Shop = {
    id: 2,
    name: "Ozon",
    address: "Jason Moyo Avenue, 263, Хараре",
    deliveryAt: dayjs().add(31, "days").toISOString(),
};

export const SKURATOV: Shop = {
    id: 3,
    name: "Wildberis",
    address: "ул. Пушкина, д.колотушкина",
    deliveryAt: dayjs().add(2, "days").toISOString(),
};

export const getAll = () => [COFFEBEAN, COFFESHOP_COMPANY, SKURATOV];
