import { useState, useEffect } from "react";
import cn from "classnames";
import { Layout } from "antd";
import { ReactComponent as Logo } from "./logo.svg";
import styles from "./styles.module.scss";

const STICKY_LIMIT = 1080 - 170;

const useSticky = () => {
    const [isSticky, setSticky] = useState(true);
    const handleScroll = () => {
        setSticky(window.scrollY >= STICKY_LIMIT);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", () => handleScroll);
        };
    }, []);

    return { isSticky };
};

type Props = {
    stickable?: boolean;
    className?: string;
    theme?: "normal" | "transparent";
};

// https://ant.design/components/affix/
const StickyHeader = (props: Props) => {
    const { stickable = false, theme = "normal", className } = props;
    const { isSticky } = useSticky();

    return (
        <Layout.Header
            className={cn(
                styles.root,
                styles[`root--${theme}`],
                { [styles.rootSticky]: stickable && isSticky },
                className,
            )}
        >
            <div className={styles.logo}>
                <Logo width={24} />
                <h1 className={styles.logoTitle}>MarketRead</h1>
            </div>
        </Layout.Header>
    );
};

export default StickyHeader;
