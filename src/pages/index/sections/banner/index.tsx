import { Link } from "react-router-dom";

import { Carousel, Typography } from "antd";
import imgBanner1 from "./assets/b4.jpg";
import imgBanner2 from "./assets/b2.jpg";
import imgBanner3 from "./assets/b3.jpg";

import styles from "./styles.module.scss";

const Banner = () => (
    <Carousel
        autoplay
        autoplaySpeed={7000}
        // arrows
        // nextArrow={<ArrowRightOutlined />}
        // prevArrow={<ArrowLeftOutlined />}
    >
        <div className={styles.bannerItem}>
            <Typography.Text className={styles.bannerItemText}>
                <h3 style={{ color: "#fff" }}>Наш склад</h3>
                <p>MarketReads Store</p>
                <p>ул. пушкин, д. колотушкина</p>
                <i>Там мы храним наши книги!</i>
            </Typography.Text>
            <img src={imgBanner1} alt="img-banner-1" width="100%" />
        </div>
        <div className={styles.bannerItem}>
            <Typography.Text className={styles.bannerItemText}>
                <h3 style={{ color: "#fff" }}>Каталог</h3>
                <p>Гибкий поиск по фильтрам и с подходящей сортировкой</p>
                <p>С адаптацией под ваши финансовые ожидания и время аренды</p>
                <Link to="/catalog">Перейти</Link>
            </Typography.Text>
            <img src={imgBanner2} alt="img-banner-2" width="100%" />
        </div>
        <div className={styles.bannerItem}>
            <Typography.Text className={styles.bannerItemText}>
                <h3 style={{ color: "#fff" }}>Личный кабинет</h3>
                <p>
                    В личном кабинете вы можете увидеть информацию о ваших личных книгах, книгах на
                    руках, забронированных, избранных, а также в целом - об истории аренды
                </p>
                <p>Там же вы найдете и остальные, интересующие вас моменты</p>
                <Link to="/profile">Перейти</Link>
            </Typography.Text>
            <img src={imgBanner3} alt="img-banner-3" width="100%" />
        </div>
    </Carousel>
);

export { Banner };
