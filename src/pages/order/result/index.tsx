import { Layout, Button, Result } from "antd";
import { HashLink as Link } from "react-router-hash-link";

import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { Cart } from "features/cart";
import { dom } from "shared/lib";
import styles from "./styles.module.scss";

const ResultPage = () => {
    dom.useTitle("Аренда успешно оформлена! | MarketRead");

    return (
        <Layout className={styles.root}>
            <Header />
            <Layout.Content>
                <Cart.Steps.View current={2} className={styles.rootSteps} />
                <Layout>
                    <Result
                        status="success"
                        title="Заказ успешно оплачен и оформлен!"
                        subTitle="Ожидайте доставки в течение указанного в заказе времени"
                        extra={[
                            <Link to="/profile#opened" key="order">
                                <Button type="primary">Перейти к заказу</Button>
                            </Link>,
                            <Link to="/catalog" key="catalog">
                                <Button>В каталог</Button>,
                            </Link>,
                        ]}
                    />
                </Layout>
            </Layout.Content>
            <Footer />
        </Layout>
    );
};

export default ResultPage;
