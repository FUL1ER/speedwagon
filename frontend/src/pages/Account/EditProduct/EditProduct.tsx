import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";

import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import FormInput from "../../../components/FormInput/FormInput";
import { selectProduct } from "../../../redux-toolkit/product/product-selector";
import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsProductEdited
} from "../../../redux-toolkit/admin/admin-selector";
import { LoadingStatus } from "../../../types/types";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { fetchProduct } from "../../../redux-toolkit/product/product-thunks";
import IconButton from "../../../components/IconButton/IconButton";
import EditProductSelect from "./EditProductSelect";
import { updateProduct } from "../../../redux-toolkit/admin/admin-thunks";
import "./EditProduct.css";

type EditProductData = {
    productTitle: string;
    producer: string;
    year: string;
    country: string;
    type: string;
    volume: string;
    productGender: string;
    fragranceTopNotes: string;
    fragranceMiddleNotes: string;
    fragranceBaseNotes: string;
    price: string;
};

const EditProduct: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const params = useParams<{ id: string }>();
    const productData = useSelector(selectProduct);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const isProductEdited = useSelector(selectIsProductEdited);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));
        dispatch(fetchProduct(params.id));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);
    
    useEffect(() => {
        if (productData) {
            form.setFieldsValue(productData);
        }
    }, [productData])

    useEffect(() => {
        if (isProductEdited) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Product edited",
                description: "Product successfully edited!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isProductEdited]);

    const onFormSubmit = (data: EditProductData): void => {
        const bodyFormData: FormData = new FormData();
        // @ts-ignore
        bodyFormData.append("file", { file });
        bodyFormData.append(
            "product",
            new Blob([JSON.stringify({ ...data, id: productData?.id })], { type: "application/json" })
        );

        dispatch(updateProduct(bodyFormData));
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <div>
            <ContentTitle title={"??????????????????????"} titleLevel={4} icon={<EditOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={32}>
                    <Col span={12}>
                        <FormInput
                            title={"??????????"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"productTitle"}
                            error={errors.productTitleError}
                            disabled={isLoading}
                            placeholder={"??????????"}
                        />
                        <FormInput
                            title={"??????????"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"producer"}
                            error={errors.productError}
                            disabled={isLoading}
                            placeholder={"??????????"}
                        />
                        <FormInput
                            title={"?????? ??????????????"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"year"}
                            error={errors.yearError}
                            disabled={isLoading}
                            placeholder={"?????? ??????????????"}
                        />
                        <FormInput
                            title={"???????????? ???????????????? "}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"country"}
                            error={errors.countryError}
                            disabled={isLoading}
                            placeholder={"???????????? ????????????????"}
                        />
                        <FormInput
                            title={"??????"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"type"}
                            placeholder={"??????"}
                            error={errors.typeError}
                            disabled={isLoading}
                        />
                        <EditProductSelect
                            title={"??????????????????"}
                            name={"productGender"}
                            placeholder={"Gender"}
                            disabled={isLoading}
                            values={["pc", "mobile"]}
                        />
                        <FormInput
                            title={"??????????????????"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"volume"}
                            error={errors.volumeError}
                            disabled={isLoading}
                            placeholder={"??????????????????"}
                        />
                        <FormInput
                            title={"????????"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"price"}
                            error={errors.priceError}
                            disabled={isLoading}
                            placeholder={"????????"}
                        />
                    </Col>
                    <Col span={12}>
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>?????????????????????? ????????????????????</Button>
                        </Upload>
                        <div className={"edit-product-image-wrapper"}>
                            <img
                                className={"edit-product-image"}
                                src={productData.filename}
                                alt={productData.productTitle}
                            />
                        </div>
                    </Col>
                </Row>
                <IconButton title={"????????????????????"} icon={<EditOutlined />} disabled={isLoading} />
            </Form>
        </div>
    );
};

export default EditProduct;
