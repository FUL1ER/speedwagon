import React, {FC, ReactElement, useEffect} from "react";
import { Col, Row, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";

const Contacts: FC = (): ReactElement => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <ContentWrapper>
            <ContentTitle icon={<InfoCircleOutlined />} title={"Контакти"} />
            <Row gutter={32}>
                <Col span={18}>
                    <div>
                        <Typography.Text strong>{"Мобільний телефон: "}</Typography.Text>
                        <Typography.Text>(096) 889-08-27</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text strong>{"Поштова скринька: "}</Typography.Text>
                        <Typography.Text>speedwagonsite@gmail.com</Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Робочі години</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>
                            Онлайн магазин працює цілодобово. Обробляємо замовлення з 08:00 до 20:00 без перерви та вихідних. <br />
                            Онлайн замовлення приймаються цілодобово.
                        </Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Доставка</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>Доставку здійснюємо на поштове відділення Нової пошти.
                            <br/>
                            Вартість доставки залежить від тарифів компанії перевізника: <a href="https://novaposhta.ua/delivery">Нова Пошта - тарифи</a>
                            <br/>
                            При замовленні на суму від 700 грн — доставка <strong>безкоштовна*</strong>.</Typography.Text>
                    </div>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Contacts;
