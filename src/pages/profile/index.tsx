import { Layout } from "antd";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { dom } from "shared/lib";
import { Aside } from "./aside";
import { Content } from "./content";
import { Sidebar } from "./sidebar";
import styles from "./styles.module.scss";

const ProfilePage = () => {
    dom.useTitle("Личный кабинет | Sharead");

    return (
        <Layout className={styles.root}>
            <Header />
            <Layout.Content>
                <Layout>
                    <Aside />
                    <Content />
                    <Sidebar />
                </Layout>
            </Layout.Content>
            <Footer />
        </Layout>
    );
};

export default ProfilePage;
