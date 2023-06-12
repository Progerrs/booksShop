import { Typography, Layout, Avatar, Divider } from "antd";
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

import { Wallet } from "features/wallet";
import { viewerModel } from "entities/viewer";
import { Tile } from "shared/ui";
import * as lib from "../lib";
import styles from "./styles.module.scss";

// eslint-disable-next-line max-lines-per-function
export const Aside = () => {
    const viewer = viewerModel.useViewer();

    return (
        <Layout.Sider className={styles.rootContiner} width={400}>
            <div className={styles.root}>
                <section className={styles.main}>
                    <Avatar size={128} icon={<UserOutlined />} />
                    <Typography.Title level={3} style={{ marginTop: 10 }}>
                        {viewer.firstName} {viewer.lastName}
                    </Typography.Title>
                    <Typography.Text>
                        {viewer.email}&nbsp;
                        <EmailVerified emailVerified={viewer.emailVerified} />
                    </Typography.Text>
                </section>
                <Divider />
                <section>
                    <Wallet.AddFunds.Popover
                        placement="right"
                        buttonStyle={{ fontSize: 30, height: 60, width: "100%" }}
                    />
                </section>
                <Divider />
                <section>
                    <Tile.Group data={lib.getStats(viewer)} itemSpan={11} />
                </section>
            </div>
        </Layout.Sider>
    );
};

const EmailVerified = ({ emailVerified }: { emailVerified: boolean }) => {
    if (emailVerified) {
        return <CheckCircleOutlined title="Почта подтверждена" style={{ color: "green" }} />;
    }

    return <ClockCircleOutlined title="Ожидает подтверждения" style={{ color: "red" }} />;
};
