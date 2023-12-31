import { Button, Layout } from "antd";

import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
// eslint-disable-next-line no-restricted-imports
import { useTitle } from "shared/lib/dom";
import Section from "./section";
import styles from "./styles.module.scss";

// eslint-disable-next-line max-lines-per-function
const AboutPage = () => {
    useTitle("О нас — MarketRead");

    return (
        <Layout>
            <Header />
            <Layout.Content>
                <HeroSection />
                <BenefitsSection />
                <FeaturesSection />
                <SocialSection />
            </Layout.Content>
            <Footer />
        </Layout>
    );
};

const HeroSection = () => (
    <Section className={styles.hero} innerClassName={styles.heroContent}>
        <h2>Букшеринг</h2>
        <p>
            Наш сервис позволяет людям обмениваться книгами. Владелец книги может отдать её сервису,
            чтобы предложить желающим арендовать её.
        </p>
        <p>
            Книгу можно отдать навсегда или на время. Желающие могут пользоваться книгой выбранный
            срок и платят за это меньше, чем книга стоит в магазине.
        </p>
        <Button size="large">Попробовать</Button>
    </Section>
);

const BenefitsSection = () => (
    <Section id="benefits" className={styles.benefits}>
        <h2>Книги - новые активы</h2>
        <p>
            Купленные книги, обычно, со временем начинают пылиться на полке. Вместо этого - вы
            можете доверить их нашему сервису в аренду, получая пассивный доход!
        </p>
        <p>
            С другой стороны - букшеринг позволяет, не тратить большие деньги, на ознакомление с
            интересующими книгами. <b>MarketRead</b> - поможет вам получить нужные книги, только на
            нужное вам время и без переплат!
        </p>
    </Section>
);

const FeaturesSection = () => (
    <Section id="features" className={styles.features}>
        <h2>Возможности</h2>
        <ul>
            <li>Удобный поиск по базе</li>
            <li>База всех доступных сервису книг</li>
            <li>Механизмы аренды и оплаты</li>
            <li>Внутренняя логика начисления процентов</li>
            <li>Рейтинговая система</li>
            <li>Механизм оповещений о мероприятиях</li>
            <li>Механизмы для проведения безопасных сделок</li>
        </ul>
    </Section>
);

const SocialSection = () => (
    <Section id="social">
        <h2>Поиск единомышленников</h2>
        <p>
            Бумажные книги переосмысляются. Они теперь не столько источник знания, сколько основа
            для сообщества: от поиска единомышленников до обмена опытом.
        </p>
        <p>На одних и тех же книгах строятся профессиональные сообщества и компании друзей.</p>
    </Section>
);

export default AboutPage;
