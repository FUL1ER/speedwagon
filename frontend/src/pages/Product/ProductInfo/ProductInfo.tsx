import React, { FC, ReactElement } from "react";
import { Button, Col, Divider, Rate, Row, Space, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import Description from "./Description/Description";
import { Product } from "../../../types/types";

type PropsType = {
    product?: Partial<Product>;
    reviewsLength: number;
    addToCart: () => void;
};

const ProductInfo: FC<PropsType> = ({ product, reviewsLength, addToCart }): ReactElement => {
    return (
        <Row>
            <Col span={12} className={"product-image-wrapper"}>
                <img src={product?.filename} alt={product?.productTitle} className={"product-image"} />
            </Col>
            <Col span={12}>
                <Row className={"product-header"}>
                    <Col>
                        <Typography.Title level={3}>{product?.productTitle}</Typography.Title>
                        <Typography.Title level={4}>{product?.producer}</Typography.Title>
                        <Typography.Text>{product?.type}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col className={"product-rate"} span={8}>
                        <Rate allowHalf disabled value={product?.productRating} />
                        <Typography.Text>{reviewsLength} відгуків</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Typography.Text type="success">В наявності</Typography.Text>
                </Row>
                <Row style={{ marginTop: 16 }}>
                    <Col span={5}>
                        <Space align={"baseline"}>
                            <Typography.Text>{product?.price}.00 грн.</Typography.Text>
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Button icon={<ShoppingCartOutlined />} onClick={addToCart}>
                            В кошик
                        </Button>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}>
                        <Description title={"Категорія:"} />
                        <Description title={"Кількість:"} />
                        <Description title={"Рік випуску:"} />
                        <Description title={"Країна виробник:"} />
                    </Col>
                    <Col span={16}>
                        <Description title={product?.productGender} />
                        <Description title={`${product?.volume} `} />
                        <Description title={product?.year} />
                        <Description title={product?.country} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ProductInfo;
