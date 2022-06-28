import React, { FC, ReactElement } from "react";
import { Button, Card, Col, InputNumber, Row, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { Product } from "../../../types/types";

type PropsType = {
    product: Product;
    productInCart: Map<any, any>;
    onChangeProductItemCount: (productId: number, inputValue: number) => void;
    deleteFromCart: (productId: number) => void;
};

const CartItem: FC<PropsType> = ({
    product,
    productInCart,
    onChangeProductItemCount,
    deleteFromCart
}): ReactElement => {
    return (
        <Card className={"cart-item"}>
            <Row gutter={16}>
                <Col span={8} className={"cart-item-image"}>
                    <img src={product.filename} alt={product.productTitle} style={{ height: 100 }} />
                </Col>
                <Col span={8}>
                    <Typography.Title level={3}>{product.producer}</Typography.Title>
                    <Typography.Title level={5}>{product.productTitle}</Typography.Title>
                    <Typography.Text strong>{product.volume} </Typography.Text>
                </Col>
                <Col span={8}>
                    <Row gutter={8}>
                        <Col span={12}>
                            <InputNumber
                                min={1}
                                max={99}
                                value={productInCart.get(product.id)}
                                onChange={(value) => onChangeProductItemCount(product.id, value)}
                            />
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => deleteFromCart(product.id)} icon={<CloseOutlined />}>
                                Видалити
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Typography.Title level={4}>{product.price * productInCart.get(product.id)} грн.</Typography.Title>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default CartItem;
