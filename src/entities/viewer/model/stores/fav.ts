import { browser } from "shared/lib";

import { fakeApi } from "shared/api";
import * as events from "../events";

export const initialState: number[] = fakeApi.users.users.getViewer().favABooks;

export const $store = browser
    .createPersistStore(initialState, { name: "entities/viewer/fav" })
    .on(events.toggleBook, (state, payload) => {
        if (state.includes(payload)) {
            return state.filter((it) => it !== payload);
        }
        return [...state, payload];
    });
