import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Table } from "antd";
import { InfoCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

import {
    selectIsOrderLoaded,
    selectIsOrderLoading,
    selectOrder,
    selectOrderItems
} from "../../../redux-toolkit/order/order-selector";
import { fetchOrderById, fetchOrderItemsByOrderId } from "../../../redux-toolkit/order/order-thunks";
import { resetOrderState } from "../../../redux-toolkit/order/order-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import Spinner from "../../../components/Spinner/Spinner";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import { OrderItem } from "../../../types/types";
import "./ManageUserOrder.css";

const ManageUserOrder: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const order = useSelector(selectOrder);
    const orderItems = useSelector(selectOrderItems);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const isOrderLoaded = useSelector(selectIsOrderLoaded);
    const { id, email, firstName, lastName, totalPrice, postIndex, phoneNumber, date, city, address } = order;

    useEffect(() => {
        dispatch(fetchOrderById(params.id));

        return () => {
            dispatch(resetOrderState());
        };
    }, []);

    useEffect(() => {
        if (isOrderLoaded) {
            dispatch(fetchOrderItemsByOrderId(params.id));
        }
    }, [isOrderLoaded]);

    return (
        <>
            {isOrderLoading ? (
                <Spinner />
            ) : (
                <>
                    <div style={{ textAlign: "center" }}>
                        <ContentTitle title={`Замовлення №${id}`} titleLevel={4} icon={<ShoppingOutlined />} />
                    </div>
                    <Row>
                        <Col span={24}>
                            <Card>
                                <Row gutter={32}>
                                    <Col span={12}>
                                        <InfoCircleOutlined className={"manage-user-icon"} />
                                        <ContentTitle title={"Персональні дані замовника"} titleLevel={5} />
                                        <AccountDataItem title={"Ім'я"} text={firstName} />
                                        <AccountDataItem title={"Прізвище"} text={lastName} />
                                        <AccountDataItem title={"Місто"} text={city} />
                                        <AccountDataItem title={"Адреса"} text={address} />
                                        <AccountDataItem title={"Email"} text={email} />
                                        <AccountDataItem title={"Номер телефону"} text={phoneNumber} />
                                        <AccountDataItem title={"Поштовий індекс"} text={postIndex} />
                                    </Col>
                                    <Col span={12}>
                                        <InfoCircleOutlined className={"manage-user-icon"} />
                                        <ContentTitle title={"Інформація замовлення"} titleLevel={5} />
                                        <AccountDataItem title={"Замовлення №"} text={id} />
                                        <AccountDataItem title={"Дата"} text={date} />
                                        <ContentTitle title={`Вартість замовлення: ${totalPrice}.0 грн.`} titleLevel={4} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 16 }}>
                                    <Col span={24}>
                                        <Table
                                            rowKey={"id"}
                                            pagination={false}
                                            dataSource={orderItems}
                                            columns={[
                                                {
                                                    title: "Номер товару",
                                                    dataIndex: "id",
                                                    key: "id"
                                                },
                                                {
                                                    title: "Виробник",
                                                    dataIndex: "producer",
                                                    key: "producer",
                                                    render: (_, order: OrderItem) => order.product.producer
                                                },
                                                {
                                                    title: "Назва",
                                                    dataIndex: "productTitle",
                                                    key: "productTitle",
                                                    render: (_, order: OrderItem) => order.product.productTitle
                                                },
                                                {
                                                    title: "Кількість",
                                                    dataIndex: "quantity",
                                                    key: "quantity"
                                                },
                                                {
                                                    title: "Ціна",
                                                    dataIndex: "price",
                                                    key: "price",
                                                    render: (_, order: OrderItem) => `${order.product.price}.0 грн.`
                                                },
                                                {
                                                    title: "Сума",
                                                    dataIndex: "amount",
                                                    key: "amount",
                                                    render: (_, order: OrderItem) => `${order.amount}.0 грн.`
                                                }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUserOrder;
