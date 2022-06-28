import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Table } from "antd";

import { selectAdminStateUser, selectIsAdminStateLoading } from "../../../redux-toolkit/admin/admin-selector";
import { selectOrders, selectTotalElements } from "../../../redux-toolkit/orders/orders-selector";
import { fetchUserInfo } from "../../../redux-toolkit/admin/admin-thunks";
import { resetOrders } from "../../../redux-toolkit/orders/orders-slice";
import { resetAdminState } from "../../../redux-toolkit/admin/admin-slice";
import { LoadingStatus, Order, UserOrdersRequest } from "../../../types/types";
import { fetchUserOrdersByEmail } from "../../../redux-toolkit/orders/orders-thunks";
import Spinner from "../../../components/Spinner/Spinner";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import { ACCOUNT_USER_ORDERS } from "../../../constants/routeConstants";
import { useTablePagination } from "../../../hooks/useTablePagination";

const ManageUser: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const userData = useSelector(selectAdminStateUser);
    const userOrders = useSelector(selectOrders);
    const totalElements = useSelector(selectTotalElements);
    const isUserLoading = useSelector(selectIsAdminStateLoading);
    const handleTableChange = useTablePagination<Order, UserOrdersRequest>(fetchUserOrdersByEmail, userData.email!);
    const { id, email, firstName, lastName, city, address, phoneNumber, postIndex, provider, roles } = userData;

    useEffect(() => {
        dispatch(fetchUserInfo(params.id));

        return () => {
            dispatch(resetOrders());
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (userData.email) {
            dispatch(fetchUserOrdersByEmail({ email: userData.email!, page: 0 }));
        }
    }, [userData]);

    return (
        <>
            {isUserLoading ? (
                <Spinner />
            ) : (
                <>
                    <ContentTitle title={`Користувач: ${firstName} ${lastName}`} titleLevel={4} icon={<UserOutlined />} />
                    <Row>
                        <Col span={24}>
                            <Card>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <AccountDataItem title={"Ім'я"} text={firstName} />
                                        <AccountDataItem title={"Прізвище"} text={lastName} />
                                        <AccountDataItem title={"Email"} text={email} />
                                        <AccountDataItem title={"Роль"} text={roles} />
                                    </Col>
                                    <Col span={12}>
                                        <AccountDataItem title={"Provider"} text={provider} />
                                        <AccountDataItem title={"Місто"} text={city} />
                                        <AccountDataItem title={"Адреса"} text={address} />
                                        <AccountDataItem title={"Номер телефону"} text={phoneNumber} />
                                        <AccountDataItem title={"Поштовий індекс"} text={postIndex} />
                                    </Col>
                                </Row>
                            </Card>
                            <Row style={{ marginTop: 16 }}>
                                <Col span={24}>
                                    {userOrders.length === 0 ? (
                                        <div style={{ textAlign: "center" }}>
                                            <ContentTitle title={"Нема замовлень"} titleLevel={4} />
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{ textAlign: "center" }}>
                                                <ContentTitle title={"Замовлення"} titleLevel={4} />
                                            </div>
                                            <Table
                                                rowKey={"id"}
                                                onChange={handleTableChange}
                                                pagination={{
                                                    total: totalElements,
                                                    position: ["bottomRight", "topRight"]
                                                }}
                                                dataSource={userOrders}
                                                columns={[
                                                    {
                                                        title: "№",
                                                        dataIndex: "id",
                                                        key: "id"
                                                    },
                                                    {
                                                        title: "Дата",
                                                        dataIndex: "date",
                                                        key: "date"
                                                    },
                                                    {
                                                        title: "Місто",
                                                        dataIndex: "city",
                                                        key: "city"
                                                    },
                                                    {
                                                        title: "Адреса",
                                                        dataIndex: "address",
                                                        key: "address"
                                                    },
                                                    {
                                                        title: "Поштовий індекс",
                                                        dataIndex: "postIndex",
                                                        key: "postIndex"
                                                    },
                                                    {
                                                        title: "Вартість замовлення",
                                                        dataIndex: "totalPrice",
                                                        key: "totalPrice",
                                                        render: (_, order: Order) => `${order.totalPrice}.0 грн.`
                                                    },
                                                    {
                                                        title: "",
                                                        dataIndex: "actions",
                                                        key: "actions",
                                                        render: (_, order: Order) => (
                                                            <Link to={`${ACCOUNT_USER_ORDERS}/${order.id}`}>
                                                                Детальніше
                                                            </Link>
                                                        )
                                                    }
                                                ]}
                                            />
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUser;