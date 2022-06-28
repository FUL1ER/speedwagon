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
            <ContentTitle title={"Добавити техніку"} titleLevel={4} icon={<PlusSquareOutlined />} />
            <Form onFinish={onFormSubmit}>
                <Row gutter={32}>
                    <Col span={12}>
                        <AddFormInput
                            title={"Назва"}
                            name={"productTitle"}
                            error={productErrors.productTitleError}
                            placeholder={"Введіть назву"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Рік випуску"}
                            name={"year"}
                            error={productErrors.yearError}
                            placeholder={"Введіть рік випуску"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Тип"}
                            name={"type"}
                            error={productErrors.typeError}
                            placeholder={"Тип"}
                            disabled={ispProductLoading}
                        />
                        <AddFormSelect
                            title={"Категорія"}
                            name={"productGender"}
                            error={productErrors.productGenderError}
                            placeholder={"pc"}
                            disabled={ispProductLoading}
                            values={["pc", "mobile"]}
                        />
                    </Col>
                    <Col span={12}>
                        <AddFormInput
                            title={"Бренд"}
                            name={"product"}
                            error={productErrors.productError}
                            placeholder={"Вкажіть бренд"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Країна виробник"}
                            name={"country"}
                            error={productErrors.countryError}
                            placeholder={"Вкажіть країну виробника"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Кількість"}
                            name={"volume"}
                            error={productErrors.volumeError}
                            placeholder={"Вкажіть кількість"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Ціна"}
                            name={"price"}
                            error={productErrors.priceError}
                            placeholder={"Вкажіть ціну"}
                            disabled={ispProductLoading}
                        />
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} style={{ marginTop: 22 }}>
                                Завантажити зображення
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <IconButton title={"Добавити"} icon={<PlusSquareFilled />} />
            </Form>
        </>
    );
};

export default AddProduct;
