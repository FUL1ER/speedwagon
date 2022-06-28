import React, { FC, ReactElement } from "react";
import { Select } from "antd";
import {SearchProduct} from "../../types/types";

const searchByData = [
    { label: "Бренд", value: SearchProduct.BRAND },
    { label: "Назва", value: SearchProduct.PRODUCT_TITLE },
    { label: "Країна виробник", value: SearchProduct.COUNTRY }
];

type PropsType = {
    handleChangeSelect: (value: SearchProduct) => void;
};

const SelectSearchData: FC<PropsType> = ({ handleChangeSelect }): ReactElement => {
    return (
        <Select defaultValue={SearchProduct.BRAND} onChange={handleChangeSelect} style={{ width: 250 }}>
            {searchByData.map((value, index) => (
                <Select.Option key={index} value={value.value}>
                    {value.label}
                </Select.Option>
            ))}
        </Select>
    );
};

export default SelectSearchData;
