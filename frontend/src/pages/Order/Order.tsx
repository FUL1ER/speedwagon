import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CheckCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Typography } from "antd";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import FormInput from "../../components/FormInput/FormInput";
import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import { selectProducts } from "../../redux-toolkit/products/products-selector";
import { selectTotalPrice } from "../../redux-toolkit/cart/cart-selector";
import { selectIsOrderLoading, selectOrderErrors } from "../../redux-toolkit/order/order-selector";
import { resetOrderState, setOrderLoadingState } from "../../redux-toolkit/order/order-slice";
import { LoadingStatus } from "../../types/types";
import { resetProductsState } from "../../redux-toolkit/products/products-slice";
import OrderItem from "./OrderItem/OrderItem";
import { addOrder } from "../../redux-toolkit/order/order-thunks";

interface OrderFormData {
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    phoneNumber: string;
    postIndex: string;
    email: string;
}

const Order: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();
    const usersData = useSelector(selectUserFromUserState);
    const products = useSelector(selectProducts);
    const totalPrice = useSelector(selectTotalPrice);
    const errors = useSelector(selectOrderErrors);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const productsFromLocalStorage: Map<number, number> = new Map(
        JSON.parse(localStorage.getItem("products") as string)
    );

    useEffect(() => {
        dispatch(setOrderLoadingState(LoadingStatus.LOADED));

        if (usersData) {
            form.setFieldsValue(usersData);
        }

        return () => {
            dispatch(resetOrderState());
            dispatch(resetProductsState());
        };
    }, []);

    const onFormSubmit = (order: OrderFormData): void => {
        const productsId = Object.fromEntries(new Map(JSON.parse(localStorage.getItem("products") as string)));
        dispatch(addOrder({ order: { ...order, productId: productsId }, history }));
    };

    return (
        <ContentWrapper>
            <div style={{ textAlign: "center" }}>
                <ContentTitle icon={<ShoppingOutlined />} title={"Підтвердження замовлення"} />
            </div>
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={32}>
                    <Col span={12}>
                        <FormInput
                            title={"Ім'я:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"firstName"}
                            error={errors.firstNameError}
                            disabled={isOrderLoading}
                            placeholder={"Введіть ім'я"}
                        />
                        <FormInput
                            title={"Прізвище:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"lastName"}
                            error={errors.lastNameError}
                            disabled={isOrderLoading}
                            placeholder={"Введіть прізвище"}
                        />
                        <FormInput
                            title={"Місто:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"city"}
                            error={errors.cityError}
                            disabled={isOrderLoading}
                            placeholder={"Введіть місто"}
                        />
                        <FormInput
                            title={"Адреса:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"address"}
                            error={errors.addressError}
                            disabled={isOrderLoading}
                            placeholder={"Введіть адресу доставки"}
                        />
                        <FormInput
                            title={"Індекс:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"postIndex"}
                            error={errors.postIndexError}
                            disabled={isOrderLoading}
                            placeholder={"Введіть поштовий індекс"}
                        />
                        <FormInput
                            title={"Мобільний телефон:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"phoneNumber"}
                            error={errors.phoneNumberError}
                            disabled={isOrderLoading}
                            placeholder={"(___)-___-____"}
                        />
                        <FormInput
                            title={"Email:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"email"}
                            error={errors.emailError}
                            disabled={isOrderLoading}
                            placeholder={"example@gmail.com"}
                        />
                    </Col>
                    <Col span={12}>
                        <Row gutter={[32, 32]}>
                            {products.map((product) => (
                                <OrderItem
                                    key={product.id}
                                    product={product}
                                    quantity={productsFromLocalStorage.get(product.id)}
                                />
                            ))}
                        </Row>
                        <Row gutter={[32, 32]} style={{ marginTop: 16 }}>
                            <Col span={16}>
                                <Typography.Title level={3}>До оплати : {totalPrice}.00 грн.</Typography.Title>
                            </Col>
                            <Col>
                                <Button
                                    htmlType={"submit"}
                                    loading={isOrderLoading}
                                    type="primary"
                                    size="large"
                                    icon={<CheckCircleOutlined />}
                                >
                                    Підтвердити замовлення
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </ContentWrapper>
    );
};

export default Order;
