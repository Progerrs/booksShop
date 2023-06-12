import dayjs from "dayjs";
import { fakeApi } from "shared/api";
import type { Book } from "shared/api";

const getRentStats = (userBooks: Book[]) => {
    return userBooks.map((ub) => {
        const maxDuration = dayjs(ub.availableBefore).diff(dayjs(), "day");
        const orders = fakeApi.checkout.orders.getByBookId(ub.id).sort((a, b) => a.id - b.id);
        const lastStatus = orders.slice(-1)[0]?.status;

        const couldBeRent = !orders.length || lastStatus === "CLOSED";

        return {
            book: ub,
            maxDuration,
            couldBeRent,
        };
    });
};

// eslint-disable-next-line max-lines-per-function
export const getRentInfo = (aBookId: number) => {
    const userBooks = fakeApi.users.userBooks.getUserBooksByABook(aBookId);
    // CASE: Нет экземпляров
    if (!userBooks.length) {
        return {
            // couldBeRent: false,
            // couldBeReserve: false,
            inStock: false,
            status: "OUT_STOCK" as const,
            duration: 0,
            items: [],
        };
    }

    // Статусы по книгам
    // Интервалы для аренды
    const rentStats = getRentStats(userBooks);

    // Только доступные книги:
    // - Не арендуются сейчас
    // - Возвращать владельцу не раньше недели
    const availableBooks = rentStats.filter((rs) => rs.couldBeRent && rs.maxDuration >= 7);

    const maxDuration = Math.max(...rentStats.map((rs) => rs.maxDuration), 0);
    const reservations = fakeApi.checkout.reservations
        .getByABook(aBookId)
        .filter((r) => r.status === "PENDING");

    // CASE: Достаточно ли экземпляров для активных броней?
    if (reservations.length < availableBooks.length) {
        return {
            inStock: true,
            status: "RENTABLE" as const,
            duration: maxDuration,
            items: rentStats,
        };
    }

    // CASE: Броней слишком много, можно только встать в очередь на книгу
    return {
        inStock: true,
        status: "RESERVABLE" as const,
        duration: maxDuration,
        items: rentStats,
    };
};
