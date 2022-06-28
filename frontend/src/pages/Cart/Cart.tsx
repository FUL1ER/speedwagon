import React, {FC, ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ShoppingCartOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Button, Col, Row, Typography} from "antd";
import {Link} from "react-router-dom";

import ContentTitle from "../../components/ContentTitle/ContentTitle";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import {selectCartItems, selectIsCartLoading, selectTotalPrice} from "../../redux-toolkit/cart/cart-selector";
import {fetchCart} from "../../redux-toolkit/cart/cart-thunks";
import {
    calculateCartPrice,
    removeProductById,
    resetCartState,
    setCartItemsCount
} from "../../redux-toolkit/cart/cart-slice";
import {Product} from "../../types/types";
import CartItem from "./CartItem/CartItem";
import Spinner from "../../components/Spinner/Spinner";
import {ORDER} from "../../constants/routeConstants";
import "./Cart.css";
import {fetchProduct} from "../../redux-toolkit/product/product-thunks";

const Cart: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const products = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const isCartLoading = useSelector(selectIsCartLoading);
    const [productInCart, setProductInCart] = useState(() => new Map());

    useEffect(() => {
        window.scrollTo(0, 0);
        const productsFromLocalStorage: Map<number, number> = new Map(
            JSON.parse(localStorage.getItem("products") as string)
        );

        dispatch(fetchCart(Array.from(productsFromLocalStorage.keys())));
        productsFromLocalStorage.forEach((value: number, key: number) => {
            setProductInCart(productInCart.set(key, value));
        });

        return () => {
            dispatch(resetCartState());
        };
    }, []);

    const deleteFromCart = (productId: number): void => {
        productInCart.delete(productId);

        if (productInCart.size === 0) {
            localStorage.removeItem("products");
            setProductInCart(new Map());
        } else {
            localStorage.setItem("products", JSON.stringify(Array.from(productInCart.entries())));
        }
        dispatch(removeProductById(productId));
        dispatch(calculateCartPrice(products));
        dispatch(setCartItemsCount(productInCart.size));
    };

    const onChangeProductItemCount = (productId: number, inputValue: number): void => {
        setProducts(productId, inputValue);
        dispatch(calculateCartPrice(products));
    };

    const setProducts = (productId: number, productCount: number): void => {
        setProductInCart(productInCart.set(productId, productCount));
        localStorage.setItem("products", JSON.stringify(Array.from(productInCart.entries())));
    };

    return (
        <ContentWrapper>
            {isCartLoading ? (
                <Spinner/>
            ) : (
                <>
                    <div style={{textAlign: "center"}}>
                        <ContentTitle icon={<ShoppingCartOutlined/>} title={"Кошик"}/>
                    </div>
                    <Row gutter={32}>
                        {products.length === 0 ? (
                            <Col span={24}>
                                <Typography.Title level={3} style={{textAlign: "center"}}>
                                    Кошик порожній
                                </Typography.Title>
                            </Col>
                        ) : (
                            <>
                                <Col span={16}>
                                    {products.map((product: Product) => (
                                        <CartItem
                                            key={product.id}
                                            product={product}
                                            productInCart={productInCart}
                                            onChangeProductItemCount={onChangeProductItemCount}
                                            deleteFromCart={deleteFromCart}
                                        />
                                    ))}
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={12}>
                                            <Typography.Title level={3}>Сума: {totalPrice} грн.</Typography.Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Link to={ORDER}>
                                                <Button type="primary" icon={<ShoppingOutlined/>} size="large">
                                                    Підтвердити
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </>
                        )}
                    </Row>
                </>
            )}
        </ContentWrapper>
    );
};

export default Cart;
