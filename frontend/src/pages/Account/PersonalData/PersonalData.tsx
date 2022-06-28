import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "antd";
import { CheckOutlined, EditOutlined, EyeInvisibleOutlined, ProfileOutlined } from "@ant-design/icons";

import { selectUserEditErrors, selectUserFromUserState } from "../../../redux-toolkit/user/user-selector";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import FormInput from "../../../components/FormInput/FormInput";
import IconButton from "../../../components/IconButton/IconButton";
import { updateUserInfo } from "../../../redux-toolkit/user/user-thunks";
import { resetInputForm } from "../../../redux-toolkit/user/user-slice";

interface PersonalData {
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    phoneNumber: string;
    postIndex: string;
}

const PersonalData: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const usersData = useSelector(selectUserFromUserState);
    const errors = useSelector(selectUserEditErrors);
    const [showUserData, setShowUserData] = useState<boolean>(false);
    const { firstNameError, lastNameError } = errors;

    const onClickShowUserData = (): void => {
        setShowUserData((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(resetInputForm());

        if (usersData) {
            form.setFieldsValue(usersData);
        }
    }, []);

    const onFormSubmit = (data: PersonalData): void => {
        dispatch(updateUserInfo({ id: usersData?.id, ...data }));
    };

    return (
        <>
            <ContentTitle title={"Персональні дані"} titleLevel={4} icon={<ProfileOutlined />} />
            <Row>
                <Col span={12}>
                    <AccountDataItem title={"Email"} text={usersData?.email} />
                    <AccountDataItem title={"Ім'я"} text={usersData?.firstName} />
                    <AccountDataItem title={"Прізвище"} text={usersData?.lastName} />
                    <AccountDataItem title={"Містд"} text={usersData?.city} />
                    <AccountDataItem title={"Адреса"} text={usersData?.address} />
                    <AccountDataItem title={"Номер телефону"} text={usersData?.phoneNumber} />
                    <AccountDataItem title={"Поштовий індекс"} text={usersData?.postIndex} />
                    <Button
                        type={"primary"}
                        onClick={onClickShowUserData}
                        icon={showUserData ? <EyeInvisibleOutlined /> : <EditOutlined />}
                    >
                        {showUserData ? "Відмінити" : "Редагувати"}
                    </Button>
                </Col>
                <Col span={12}>
                    {showUserData && (
                        <Form onFinish={onFormSubmit} form={form}>
                            <FormInput
                                title={"Ім'я:"}
                                titleSpan={8}
                                wrapperSpan={16}
                                name={"firstName"}
                                error={firstNameError}
                                placeholder={"Ім'я"}
                            />
                            <FormInput
                                title={"Прізвище:"}
                                titleSpan={8}
                                wrapperSpan={16}
                                name={"lastName"}
                                error={lastNameError}
                                placeholder={"Прізвище"}
                            />
                            <FormInput
                                title={"Місто:"}
                                titleSpan={8}
                                wrapperSpan={16}
                                name={"city"}
                                placeholder={"Місто"}
                            />
                            <FormInput
                                title={"Адреса:"}
                                titleSpan={8}
                                wrapperSpan={16}
                                name={"address"}
                                placeholder={"Адреса"}
                            />
                            <FormInput
                                title={"Номер телефону:"}
                                titleSpan={8}
                                wrapperSpan={16}
                                name={"phoneNumber"}
                                placeholder={"Номер телефону"}
                            />
                            <FormInput
                                title={"Поштовий індекс:"}
                                titleSpan={8}
                                wrapperSpan={16}
                                name={"postIndex"}
                                placeholder={"Поштовий індекс"}
                            />
                            <IconButton title={"Зберегти"} icon={<CheckOutlined />} />
                        </Form>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default PersonalData;
