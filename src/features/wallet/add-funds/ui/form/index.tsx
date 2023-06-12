import { Input, Typography, Button, Form } from "antd";
import cn from "classnames";
import { useState } from "react";
import ym from "react-yandex-metrika";

import { viewerModel } from "entities/viewer";
import styles from "./styles.module.scss";

type Props = {
    className?: string;
};

const MIN_MONEY = 100;

const AddFundsForm = ({ className }: Props) => {
    const viewer = viewerModel.useViewerWallet();
    const [money, setMoney] = useState(MIN_MONEY);
    const isValid = money >= MIN_MONEY;

    return (
        <div className={cn(styles.root, className)}>
            <Typography.Title level={4}>Пополнение кошелька</Typography.Title>
            <Form.Item
                validateStatus={isValid ? "success" : "error"}
                help="Минимальный платеж составляет 100 рублей"
            >
                <Input
                    addonAfter="₽"
                    min={MIN_MONEY}
                    type="number"
                    value={money || ""}
                    onChange={(e) => setMoney(Number(e.target.value))}
                    placeholder="Введите нужную сумму ..."
                />
            </Form.Item>
            <Typography.Text type="secondary" className={styles.remark}>
                Оплата будет проходить на внешнем сервисе по стандартам безопасности PCI DSS
            </Typography.Text>
            <Button
                type="primary"
                block
                onClick={() => {
                    // eslint-disable-next-line no-console
                    console.debug("[DEBUG] reachGoal: APPLY_TRANSACTION");
                    ym("reachGoal", "APPLY_TRANSACTION", { amount: money });
                    // eslint-disable-next-line no-restricted-globals
                    viewer.payment.applyTransaction(money).then(() => location.reload());
                }}
                loading={viewer.payment.isPending}
                disabled={!isValid}
            >
                Пополнить
            </Button>
        </div>
    );
};

export default AddFundsForm;
