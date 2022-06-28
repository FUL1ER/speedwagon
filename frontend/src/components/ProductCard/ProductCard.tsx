import React, { FC, ReactElement } from "react";
import { Button, Card, Col, Rate, Typography } from "antd";
import { Link } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import { DeleteOutlined, EditOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { Product } from "../../types/types";
import { ACCOUNT_ADMIN_PRODUCTS, PRODUCT } from "../../constants/routeConstants";
import { useCart } from "../../hooks/useCart";
import "./ProductCard.css";

type PropsType = {
    product: Product;
    colSpan: number;
    edit?: boolean;
    onOpenDelete?: (product: Product) => void;
};

const ProductCard: FC<PropsType> = ({ product, colSpan, edit, onOpenDelete }): ReactElement => {
    const { addToCart } = useCart(product.id);

    const onClickAddToCart = (event: any) => {
        event.preventDefault();
        addToCart();
    };

    return (
        <Col span={colSpan}>
            <Link to={`${PRODUCT}/${product.id}`}>
                <Card
                    className={"product-card"}
                    cover={<img className={"product-card-image"} alt={product.productTitle} src={product.filename} />}
                    hoverable
                    actions={
                        edit
                            ? [
                                  <Link to={`${ACCOUNT_ADMIN_PRODUCTS}/${product.id}`}>
                                      <Button icon={<EditOutlined />}>Редагувати</Button>
                                  </Link>,
                                  <Button icon={<DeleteOutlined />} onClick={() => onOpenDelete!(product)} danger>
                                      Видалити
                                  </Button>
                              ]
                            : [
                                  <Button icon={<ShoppingCartOutlined />} onClick={onClickAddToCart}>
                                      В кошик
                                  </Button>
                              ]
                    }
                >
                    <div className={"product-card-rate"}>
                        <Rate defaultValue={product.productRating === 0 ? 5 : product.productRating} disabled />
                        <Typography.Text>{product.reviewsCount} відгуків</Typography.Text>
                    </div>
                    <Meta title={product.productTitle} description={product.producer} style={{ textAlign: "center" }} />
                    <Typography.Text className={"product-card-price"}>{product.price}.00 грн.</Typography.Text>
                </Card>
            </Link>
        </Col>
    );
};

export default ProductCard;
