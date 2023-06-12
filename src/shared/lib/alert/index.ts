import { notification } from "antd";

const generateOpener =
    (type: import("antd/lib/notification").IconType) =>
    (
        message: any,
        description?: any,
        icon?: import("react").ReactNode,
        // eslint-disable-next-line max-params
    ) => {
        notification.open({ type, message, description, placement: "bottomRight", icon });
    };

const error = generateOpener("error");
const success = generateOpener("success");
const warn = generateOpener("warning");
const info = generateOpener("info");

const alert = { error, success, warn, info };

export default alert;
