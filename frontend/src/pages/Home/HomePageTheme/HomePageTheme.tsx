import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

import { MENU } from "../../../constants/routeConstants";
import "./HomePageTheme.css";

const HomePageTheme: FC = (): ReactElement => {
    return (
        <div className={"page-theme"}>
            <Row gutter={32}>
                <Col span={12}>
                    <Link to={{ pathname: MENU, state: { id: "mobile" } }}>
                        <img src="https://mywebstoragespring.s3.eu-central-1.amazonaws.com/mobile.png" alt={"Мобільні телефони"} />
                    </Link>
                </Col>
                <Col span={12}>
                    <Link to={{ pathname: MENU, state: { id: "pc" } }}>
                        <img src="https://mywebstoragespring.s3.eu-central-1.amazonaws.com/pc.png" alt={"Персональні комп'ютери"} />
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default HomePageTheme;
