import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { PlusSquareFilled, PlusSquareOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";

import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsProductAdded
} from "../../../redux-toolkit/admin/admin-selector";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { LoadingStatus } from "../../../types/types";
import { addProduct } from "../../../redux-toolkit/admin/admin-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AddFormInput from "./AddFormInput";
import AddFormSelect from "./AddFormSelect";
import IconButton from "../../../components/IconButton/IconButton";

type AddProductData = {
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

const AddProduct: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isProductAdded = useSelector(selectIsProductAdded);
    const ispProductLoading = useSelector(selectIsAdminStateLoading);
    const productErrors = useSelector(selectAdminStateErrors);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (isProductAdded) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Product added",
                description: "Product successfully added!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isProductAdded]);

    const onFormSubmit = (data: AddProductData): void => {
        const bodyFormData: FormData = new FormData();
        // @ts-ignore
        bodyFormData.append("file", { file });
        bodyFormData.append(
            "product",
            new Blob([JSON.stringify({ ...data, productRating: 0 })], { type: "application/json" })
        );
        console.log(bodyFormData.get("product"));
        dispatch(addProduct(bodyFormData));
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <>
            <ContentTitle title={"???????????????? ??????????????"} titleLevel={4} icon={<PlusSquareOutlined />} />
            <Form onFinish={onFormSubmit}>
                <Row gutter={32}>
                    <Col span={12}>
                        <AddFormInput
                            title={"??????????"}
                            name={"productTitle"}
                            error={productErrors.productTitleError}
                            placeholder={"?????????????? ??????????"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"?????? ??????????????"}
                            name={"year"}
                            error={productErrors.yearError}
                            placeholder={"?????????????? ?????? ??????????????"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"??????"}
                            name={"type"}
                            error={productErrors.typeError}
                            placeholder={"??????"}
                            disabled={ispProductLoading}
                        />
                        <AddFormSelect
                            title={"??????????????????"}
                            name={"productGender"}
                            error={productErrors.productGenderError}
                            placeholder={"pc"}
                            disabled={ispProductLoading}
                            values={["pc", "mobile"]}
                        />
                    </Col>
                    <Col span={12}>
                        <AddFormInput
                            title={"??????????"}
                            name={"product"}
                            error={productErrors.productError}
                            placeholder={"?????????????? ??????????"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"???????????? ????????????????"}
                            name={"country"}
                            error={productErrors.countryError}
                            placeholder={"?????????????? ???????????? ??????????????????"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"??????????????????"}
                            name={"volume"}
                            error={productErrors.volumeError}
                            placeholder={"?????????????? ??????????????????"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"????????"}
                            name={"price"}
                            error={productErrors.priceError}
                            placeholder={"?????????????? ????????"}
                            disabled={ispProductLoading}
                        />
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} style={{ marginTop: 22 }}>
                                ?????????????????????? ????????????????????
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <IconButton title={"????????????????"} icon={<PlusSquareFilled />} />
            </Form>
        </>
    );
};

export default AddProduct;
