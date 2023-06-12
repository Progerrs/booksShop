import { useStore, useStoreMap } from "effector-react";
import { fakeApi } from "shared/api";
import { $reservations } from "./store";

export const useReservationBooks = () => {
    const resIds = useStore($reservations);
    return fakeApi.library.books.getByIds(resIds);
};

export const useBookReservationStatus = (bookId: number) => {
    const isBookReserved = useStoreMap({
        store: $reservations,
        keys: [bookId],
        fn: (state, [bookId]) => state.includes(bookId),
    });

    return { isBookReserved };
};
