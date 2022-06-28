import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Divider, Form, Row, Typography } from "antd";
import { KeyOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";

import {
    selectErrorMessage,
    selectIsAuthLoading,
    selectSuccessMessage
} from "../../redux-toolkit/auth/auth-selector";
import { setAuthLoadingState } from "../../redux-toolkit/auth/auth-slice";
import { LoadingStatus } from "../../types/types";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import FormInput from "../../components/FormInput/FormInput";
import IconButton from "../../components/IconButton/IconButton";
import { forgotPassword } from "../../redux-toolkit/auth/auth-thunks";

const ForgotPassword: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const error = useSelector(selectErrorMessage);
    const success = useSelector(selectSuccessMessage);
    const isLoading = useSelector(selectIsAuthLoading);

    useEffect(() => {
        dispatch(setAuthLoadingState(LoadingStatus.LOADED));
    }, []);

    useEffect(() => {
        form.resetFields();
    }, [success]);

    const onClickSend = (value: { email: string }): void => {
        dispatch(forgotPassword(value.email));
    };

    return (
        <ContentWrapper>
            <ContentTitle icon={<KeyOutlined />} title={"Забули пароль ?"} />
            <Row gutter={32}>
                <Col span={12}>
                    <Form form={form} onFinish={onClickSend}>
                        <Divider />
                        <Typography.Text style={{ display: "block", marginBottom: 16 }}>
                            Введіть поштову скриньку, яку використовували при реєстрації.
                        </Typography.Text>
                        {error && <Alert type="error" message={error} />}
                        {success && <Alert type="success" message={success} />}
                        <FormInput
                                title={"Поштова скринька:"}
                            icon={<MailOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"email"}
                            placeholder={"E-mail"}
                            rule={[{ required: true, message: "Введіть свою поштову скриньку!" }]}
                        />
                        <IconButton disabled={isLoading} title={"Скинути"} icon={<SendOutlined />} />
                    </Form>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default ForgotPassword;
