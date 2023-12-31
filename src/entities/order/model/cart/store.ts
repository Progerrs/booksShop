import { combine } from "effector";

import * as uuid from "uuid";
import { browser } from "shared/lib";
import { fakeApi, Order } from "shared/api";
import * as events from "./events";

export const DEFAULT_DURATION = 14;

export const booksInitialState: number[] = [];

export const $books = browser
    .createPersistStore(booksInitialState, { name: "entities/order/cart--books" })
    .on(events.toggleBook, (state, payload) => {
        if (state.includes(payload)) {
            return state.filter((it) => it !== payload);
        }
        return [...state, payload];
    })
    .on(events.submitOrder, () => {
        return [];
    });

export const durationsInitialState: Record<number, number> = {};

export const $durations = browser
    .createPersistStore(durationsInitialState, { name: "entities/order/cart--duration" })
    .on(events.setBookDuration, (state, { bookId, duration }) => {
        if (duration === undefined) {
            delete state[bookId];
            return state;
        }
        return { ...state, [bookId]: duration };
    })
    .on(events.toggleBook, (state, bookId) => {
        const duration = state[bookId] ? undefined : DEFAULT_DURATION;
        if (duration === undefined) {
            delete state[bookId];
            return state;
        }
        return { ...state, [bookId]: duration };
    })
    .on(events.submitOrder, () => {
        return {};
    });

const initialDelivery = {
    date: "",
    address: "",
};
export const $delivery = browser
    .createPersistStore(initialDelivery, {
        name: "entities/order/cart--delivery",
    })
    .on(events.setDelivery, (state, payload) => {
        return {
            date: payload.date ?? state.date,
            address: payload.address ?? state.address,
        };
    });

export const $cart = combine($books, $durations, (books, durations) => {
    return { books, durations };
}).on(events.submitOrder, (state) => {
    const viewer = fakeApi.users.users.getViewer();
    const newOrders: Order[] = state.books.map((aBookId, i) => {
        return fakeApi.checkout.orders.createOrder({
            bookId: fakeApi.users.userBooks.shuffleByABook(aBookId).id,
            userId: viewer.id,
            status: "WAITING_TRANSFER",
            startDelta: 0,
            deliveredDelta: 2,
            endDelta: state.durations[aBookId] || 14,
            costs: fakeApi.library.books.getPrice(fakeApi.library.books.getById(aBookId)!),
        });
    });

    viewer.openedOrders.push(...newOrders.map((no) => no.id));

    fakeApi.checkout.orders.__pushTo(...newOrders);
    fakeApi.users.users.__updateUser(viewer);

    setTimeout(() => {
        window.location.replace(`/order/result/${uuid.v4()}`);
    }, 0);

    return { books: [], durations: {} };
});
