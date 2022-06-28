import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "antd";

import { SearchProduct } from "../types/types";
import { fetchProductsByInputText } from "../redux-toolkit/products/products-thunks";

export const useSearch = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [searchTypeValue, setSearchTypeValue] = useState<SearchProduct>(SearchProduct.BRAND);
    const [searchValue, setSearchValue] = useState<string>("");

    const handleChangeSelect = (value: SearchProduct): void => {
        setSearchTypeValue(value);
    };

    const onSearch = (data: { searchValue: string }): void => {
        setSearchValue(data.searchValue);
        dispatch(fetchProductsByInputText({ searchType: searchTypeValue, text: data.searchValue, currentPage: 0 }));
    };

    const resetFields = (): void => {
        form.resetFields();
    };

    return { searchValue, searchTypeValue, form, resetFields, handleChangeSelect, onSearch };
};
