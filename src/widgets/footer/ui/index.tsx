import { Layout } from "antd";
import styles from "./styles.module.scss";

const Footer = () => (
    <Layout.Footer className={styles.root}>
        Разаботал сайти{" "}
        <a href="https://vk.com/id97490900" target="_blank" rel="noreferrer">
            Зябликов.С.С
        </a>
    </Layout.Footer>
);

export default Footer;
