import React, { FC, ReactElement } from "react";
import { Button, Card, Col, Form, FormInstance, Input, Rate, Row, Typography } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { Review, ReviewError } from "../../../types/types";
import ReviewItem from "./ReviewItem/ReviewItem";
import { ReviewData } from "../Product";
import "./ProductReviews.css";

type PropType = {
    reviews: Review[];
    reviewErrors: Partial<ReviewError>;
    addReview: (data: ReviewData) => void;
    form: FormInstance<any>;
};

const ProductReviews: FC<PropType> = ({ reviews, reviewErrors, addReview, form }): ReactElement => {
    const { authorError, messageError, ratingError } = reviewErrors;

    return (
        <>
            <Row>
                <Col span={24} className={"product-reviews-title"}>
                    <Typography.Title level={3}>Відгуки</Typography.Title>
                </Col>
            </Row>
            <Row>
                {reviews.length === 0 ? (
                    <Col span={24} className={"product-reviews-title"}>
                        <Typography.Text>Ще нема відгуків про дану техніку.</Typography.Text>
                    </Col>
                ) : (
                    <Col span={24}>
                        {reviews.map((review) => (
                            <ReviewItem key={review.id} review={review} />
                        ))}
                    </Col>
                )}
            </Row>
            <Row>
                <Col span={24}>
                    <Form onFinish={addReview} form={form}>
                        <Card>
                            <Row gutter={32}>
                                <Col span={6}>
                                    <Typography.Text>Ваше ім'я</Typography.Text>
                                    <Typography.Text type="danger"> *</Typography.Text>
                                    <Form.Item
                                        name={"author"}
                                        help={authorError}
                                        validateStatus={authorError && "error"}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text>Ваша оцінка</Typography.Text>
                                    <Typography.Text type="danger"> *</Typography.Text>
                                    <div>
                                        <Form.Item
                                            name={"rating"}
                                            help={ratingError}
                                            validateStatus={ratingError && "error"}
                                        >
                                            <Rate />
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row className={"product-reviews-wrapper"}>
                                <Col span={24}>
                                    <Typography.Text>Відгук</Typography.Text>
                                    <Typography.Text type="danger"> *</Typography.Text>
                                    <Form.Item
                                        name={"message"}
                                        help={messageError}
                                        validateStatus={messageError && "error"}
                                    >
                                        <Input.TextArea rows={4} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className={"product-reviews-wrapper"}>
                                <Col span={24}>
                                    <Button type={"primary"} htmlType={"submit"} icon={<SendOutlined />}>
                                        Надіслати відгук
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ProductReviews;
