import { Typography, Layout, Row, Col, Empty, Button, Badge } from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    ShoppingOutlined,
    PlusOutlined,
    HeartOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import cn from "classnames";

import { Fav } from "features/fav";
import { Order } from "features/order";
import { viewerModel, viewerLib } from "entities/viewer";
import { BookCard } from "entities/book";
import type { Book, AbstractBook } from "shared/api";
import * as lib from "../lib";
import { TOPIC_CLOSED, TOPIC_MY, TOPIC_OPENED, TOPIC_RESERVED, TOPIC_FAV } from "../config";
import styles from "./styles.module.scss";

// eslint-disable-next-line max-lines-per-function
export const Content = () => {
    const viewerNrml = viewerModel.useViewerNormalized();
    const favBooks = viewerModel.useFavBooks();
    const currentAnchor = useLocation().hash.slice(1);

    return (
        <Layout className={styles.root}>
            <Section
                id={TOPIC_MY.id}
                title={TOPIC_MY.fullTitle}
                description={TOPIC_MY.description}
                books={viewerNrml.ownBooks}
                Icon={DollarOutlined}
                active={TOPIC_MY.id === currentAnchor}
                titleAfter={
                    <Button title="Добавить книгу в сервис" icon={<PlusOutlined />} type="primary">
                        Добавить
                    </Button>
                }
                renderBookDetails={(b) => {
                    const bookInfo = viewerLib.getMyBookInfo(b);
                    return (
                        <ul>
                            <li>{lib.STATUSES[bookInfo.status]}</li>
                            <li>Заработано {bookInfo.earned} ₽</li>
                        </ul>
                    );
                }}
            />
            <Section
                id={TOPIC_OPENED.id}
                title={TOPIC_OPENED.fullTitle}
                description={TOPIC_OPENED.description}
                books={viewerNrml.openedBooks}
                Icon={ShoppingOutlined}
                active={TOPIC_OPENED.id === currentAnchor}
                renderBookDetails={(_, idx) => {
                    const order = viewerNrml.opened[idx];

                    return (
                        <ul>
                            <li>{lib.STATUSES[order.status]}</li>
                            <li>{viewerLib.getOrderInfo(order)}</li>
                        </ul>
                    );
                }}
            />
            <Section
                id={TOPIC_RESERVED.id}
                title={TOPIC_RESERVED.fullTitle}
                description={TOPIC_RESERVED.description}
                books={viewerNrml.reservedBooks}
                Icon={ClockCircleOutlined}
                active={TOPIC_RESERVED.id === currentAnchor}
                getRibbonProps={(_, idx) => {
                    const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx]);

                    if (reserve.isAvailable) {
                        return { color: "orange", text: "Подошла ваша очередь!" };
                    }
                    return { color: "lightslategray", text: `В очереди: ${reserve.queryIdx + 1}` };
                }}
                renderBookDetails={(_, idx) => {
                    const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx]);

                    if (reserve.isAvailable) {
                        return (
                            <p>
                                Сделайте заказ в течение двух дней, чтобы не потерять свою очередь
                            </p>
                        );
                    }
                    return (
                        <span>
                            Время ожидания: ~ <b>{viewerLib.getDaysLabel(reserve.awaitTime)}</b>
                        </span>
                    );
                }}
                renderBookActions={(b, idx) => {
                    const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx]);
                    return [
                        <Order.Actions.AddBookMini
                            key="cart"
                            bookId={b.id}
                            disabled={!reserve.isAvailable}
                        />,
                    ];
                }}
            />
            <Section
                id={TOPIC_CLOSED.id}
                title={TOPIC_CLOSED.fullTitle}
                description={TOPIC_CLOSED.description}
                books={viewerNrml.closedBooks}
                Icon={CheckCircleOutlined}
                active={TOPIC_CLOSED.id === currentAnchor}
            />
            <Section
                id={TOPIC_FAV.id}
                title={TOPIC_FAV.fullTitle}
                description={TOPIC_FAV.description}
                books={favBooks}
                Icon={HeartOutlined}
                active={TOPIC_FAV.id === currentAnchor}
                renderBookActions={(b) => [<Fav.Actions.AddBookMini key="fav" bookId={b.id} />]}
            />
        </Layout>
    );
};

type SectionProps<T> = {
    id: string;
    title: ReactNode;
    titleAfter?: ReactNode;
    description: ReactNode;
    renderBookDetails?: (book: T, idx: number) => ReactNode;
    renderBookActions?: (book: T, idx: number) => ReactNode[];
    getRibbonProps?: (
        book: T,
        idx: number,
    ) => {
        text: ReactNode;
        color: import("react").CSSProperties["color"];
    };
    // FIXME: specify later
    Icon: typeof CheckCircleOutlined;
    books: T[];
    active?: boolean;
};

function Section<T extends Book | AbstractBook>(props: SectionProps<T>) {
    const { title, description, books, Icon, id, titleAfter, active } = props;

    return (
        <section className={cn(styles.section, { [styles.sectionActive]: active })} id={id}>
            <Row justify="space-between">
                <Typography.Title level={3} className={styles.sectionTitle}>
                    <a href={`#${id}`}>#</a>
                    {title} <Icon style={{ color: "gray", fontSize: 20 }} />
                </Typography.Title>
                {titleAfter}
            </Row>
            <Typography.Text className={styles.sectionDescription} type="secondary">
                {description}
            </Typography.Text>
            <Row gutter={[10, 10]} wrap={false} className={styles.sectionList}>
                {/* FIXME: Позднее - здесь должны отбражаться все книги, которые "доставлены" */}
                {books.map((book, idx) => (
                    <Col key={book.id} span={8}>
                        <Badge.Ribbon
                            {...props.getRibbonProps?.(book, idx)}
                            style={{
                                right: "-5px",
                                opacity: Number(props.getRibbonProps !== undefined),
                            }}
                        >
                            <BookCard
                                // @ts-ignore
                                data={book.abstractBook || book}
                                size="small"
                                withPrice={false}
                                actions={props.renderBookActions?.(book, idx)}
                            >
                                {props.renderBookDetails?.(book, idx)}
                            </BookCard>
                        </Badge.Ribbon>
                    </Col>
                ))}
            </Row>
            {!books.length && <Empty className={styles.sectionPlaceholder} description="Пусто" />}
        </section>
    );
}
