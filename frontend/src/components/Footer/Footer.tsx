import React, { FC, ReactElement } from "react";
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";

import "./Footer.scss";

const Footer: FC = (): ReactElement => {
    return (
        <div className={"footer-wrapper"}>
            <Row >
                <Col span={12}>
                    <Typography.Title level={3}>Speedwagon</Typography.Title>
                    <Typography.Text>(096) 889-08-27</Typography.Text>
                    <Typography.Text className={"mt-12"}>Працюємо з 08:00 до 20:00 без перерви та вихідних</Typography.Text>
                </Col>
                <Col span={12} >
                    <div className={"footer-wrapper-social"}>
                        <Typography.Title level={3}>Соціальні мережі</Typography.Title>
                        <a href="https://www.linkedin.com/">
                            <LinkedinOutlined />
                        </a>
                        <a href="https://m.facebook.com/100010228124273/">
                            <FacebookOutlined />
                        </a>
                    </div>
                </Col>
            </Row>
            <Row className={"footer-wrapper-copyright"}>
                <Typography.Text>© Speedwagon 2022 </Typography.Text>
            </Row>
        </div>
    );
};

export default Footer;
