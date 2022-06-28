import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { AsyncThunk } from "@reduxjs/toolkit";

import { HeaderResponse, Order } from "../../types/types";
import { ACCOUNT_USER_ORDERS } from "../../constants/routeConstants";
import { selectTotalElements } from "../../redux-toolkit/orders/orders-selector";
import { useTablePagination } from "../../hooks/useTablePagination";

type PropsType = {
    orders: Array<Order>;
    loading: boolean;
    fetchOrders: AsyncThunk<HeaderResponse<Order>, number, {}>;
};

const OrdersTable: FC<PropsType> = ({ orders, loading, fetchOrders }): ReactElement => {
    const totalElements = useSelector(selectTotalElements);
    const handleTableChange = useTablePagination<Order, number>(fetchOrders);

    return (
        <Table
            rowKey={"id"}
            onChange={handleTableChange}
            loading={loading}
            pagination={{
                total: totalElements,
                position: ["bottomRight", "topRight"]
            }}
            dataSource={orders}
            columns={[
                {
                    title: "Номер",
                    dataIndex: "id",
                    key: "id"
                },
                {
                    title: "Дата",
                    dataIndex: "date",
                    key: "date",
                    sorter: (a, b) => a.date.localeCompare(b.date)
                },
                {
                    title: "Покупець",
                    dataIndex: "firstName",
                    key: "firstName",
                    render: (_, order: Order) => `${order.firstName} ${order.lastName}`
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    key: "email"
                },
                {
                    title: "Сума, грн.",
                    dataIndex: "totalPrice",
                    key: "totalPrice",
                    sorter: (a, b) => a.totalPrice - b.totalPrice
                },
                {
                    title: "",
                    dataIndex: "operations",
                    key: "operations",
                    render: (_, order: Order) => <Link to={`${ACCOUNT_USER_ORDERS}/${order.id}`}>Детальніше</Link>
                }
            ]}
        />
    );
};

export default OrdersTable;
