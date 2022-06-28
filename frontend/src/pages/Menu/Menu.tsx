import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Layout, Pagination, RadioChangeEvent, Row, Typography } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useLocation } from "react-router-dom";

import MenuCheckboxSection from "./MenuSection/MenuCheckboxSection";
import { selectIsProductsLoading, selectProducts } from "../../redux-toolkit/products/products-selector";
import { FilterParamsType } from "../../types/types";
import { fetchProductsByFilterParams, fetchProductsByInputText } from "../../redux-toolkit/products/products-thunks";
import { resetProductsState } from "../../redux-toolkit/products/products-slice";
import MenuRadioSection from "./MenuSection/MenuRadioSection";
import MenuSorter from "./MenuSorter/MenuSorter";
import ProductCard from "../../components/ProductCard/ProductCard";
import SelectSearchData from "../../components/SelectSearchData/SelectSearchData";
import InputSearch from "../../components/InputSearch/InputSearch";
import Spinner from "../../components/Spinner/Spinner";
import { MAX_PAGE_VALUE, usePagination } from "../../hooks/usePagination";
import { gender, producer, price } from "./MenuData";
import { useSearch } from "../../hooks/useSearch";
import "./Menu.css";

export enum CheckboxCategoryFilter {
    PRODUCERS = "PRODUCERS",
    GENDERS = "GENDERS"
}

const Menu: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const isProductLoading = useSelector(selectIsProductsLoading);
    const location = useLocation<{ id: string }>();
    const [filterParams, setFilterParams] = useState<FilterParamsType>({
        producers: [],
        genders: [],
        prices: [1, 100000]
    });
    const [sortByPrice, setSortByPrice] = useState<boolean>(false);
    const { currentPage, totalElements, handleChangePagination, resetPagination } = usePagination();
    const { searchValue, searchTypeValue, resetFields, form, onSearch, handleChangeSelect } = useSearch();

    useEffect(() => {
        const productData = location.state.id;

        if (productData === "pc" || productData === "mobile") {
            dispatch(
                fetchProductsByFilterParams({
                    ...filterParams,
                    genders: [...filterParams.genders, productData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, genders: [...prevState.genders, productData] }));
        } else if (productData === "all") {
            dispatch(fetchProductsByFilterParams({ ...filterParams, sortByPrice, currentPage: 0 }));
        } else {
            dispatch(
                fetchProductsByFilterParams({
                    ...filterParams,
                    producers: [...filterParams.producers, productData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, producers: [...prevState.producers, productData] }));
        }
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetProductsState());
        };
    }, []);

    useEffect(() => {
        resetPagination();
    }, [filterParams, sortByPrice]);

    const onChangeCheckbox = (checkedValues: CheckboxValueType[], category: CheckboxCategoryFilter): void => {
        if (CheckboxCategoryFilter.PRODUCERS === category) {
            setFilterParams((prevState) => {
                const filter = { ...prevState, producers: [...(checkedValues as string[])] };
                dispatch(fetchProductsByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
                return filter;
            });
        } else if (CheckboxCategoryFilter.GENDERS === category) {
            setFilterParams((prevState) => {
                const filter = { ...prevState, genders: [...(checkedValues as string[])] };
                dispatch(fetchProductsByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
                return filter;
            });
        }
        resetFields();
    };

    const onChangeRadio = (event: RadioChangeEvent): void => {
        setFilterParams((prevState) => {
            const filter = { ...prevState, prices: event.target.value };
            dispatch(fetchProductsByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
            return filter;
        });
        resetFields();
    };

    const handleChangeSortPrice = (event: RadioChangeEvent): void => {
        dispatch(fetchProductsByFilterParams({ ...filterParams, sortByPrice: event.target.value, currentPage: 0 }));
        setSortByPrice(event.target.value);
        resetFields();
    };

    const changePagination = (page: number, pageSize: number): void => {
        if (searchValue) {
            dispatch(
                fetchProductsByInputText({ searchType: searchTypeValue, text: searchValue, currentPage: page - 1 })
            );
        } else {
            dispatch(fetchProductsByFilterParams({ ...filterParams, sortByPrice, currentPage: page - 1 }));
        }
        handleChangePagination(page, pageSize);
    };

    return (
        <Layout>
            <Layout.Content className={"login-content"}>
                <Typography.Title level={2}>Техніка</Typography.Title>
                <Row gutter={32}>
                    <Col span={6}>
                        <MenuCheckboxSection
                            title={"Бренд"}
                            onChange={onChangeCheckbox}
                            data={producer}
                            category={CheckboxCategoryFilter.PRODUCERS}
                            selectedValues={filterParams.producers}
                        />
                        <MenuCheckboxSection
                            title={"Категорія"}
                            onChange={onChangeCheckbox}
                            data={gender}
                            category={CheckboxCategoryFilter.GENDERS}
                            selectedValues={filterParams.genders}
                        />
                        <MenuRadioSection title={"Ціна"} onChange={onChangeRadio} data={price} />
                    </Col>
                    <Col span={18}>
                        <Row>
                            <Col span={9}>
                                <SelectSearchData handleChangeSelect={handleChangeSelect} />
                            </Col>
                            <Col span={10}>
                                <InputSearch onSearch={onSearch} form={form} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16, marginBottom: 16 }}>
                            <Col span={16}>
                                <Pagination
                                    current={currentPage}
                                    pageSize={MAX_PAGE_VALUE}
                                    total={totalElements}
                                    showSizeChanger={false}
                                    onChange={changePagination}
                                />
                            </Col>
                            <Col span={8}>
                                <MenuSorter onChange={handleChangeSortPrice} sortByPrice={sortByPrice} />
                            </Col>
                        </Row>
                        <Row gutter={[32, 32]}>
                            {isProductLoading ? (
                                <Spinner />
                            ) : (
                                products.map((product) => (
                                    <ProductCard key={product.id} product={product} colSpan={8} />
                                ))
                            )}
                        </Row>
                        <Row style={{ marginTop: 16, marginBottom: 16 }}>
                            <Pagination
                                current={currentPage}
                                pageSize={MAX_PAGE_VALUE}
                                total={totalElements}
                                showSizeChanger={false}
                                onChange={changePagination}
                            />
                        </Row>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default Menu;
