"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

import PageHeader from "@/features/layout/page-header";

import { Button } from "@/components/ui/button";

const ReturnPolicyPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (e.g., sending the message to an API)
        console.log("Form submitted", formData);
    };

    return (
        <>
            <PageHeader
                backgroundImage="/banner_shop.png"
                title="Chính sách đổi trả"
                breadcrumbItems={[
                    { label: "Trang chủ", href: "/home" },
                    { label: "Chính sách đổi trả", href: "/return-policy" },
                ]}
            />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="mb-4 text-4xl font-semibold">
                        Chính sách đổi trả
                    </h2>
                    <p className="mb-8 text-center text-justify">
                        Mulio cam kết mang đến cho khách hàng những sản phẩm chất lượng nhất. Tuy nhiên, nếu bạn không hài lòng với sản phẩm đã mua hoặc gặp phải vấn đề với sản phẩm, chúng tôi sẽ hỗ trợ đổi trả theo chính sách dưới đây.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        1. **Điều kiện đổi trả**:
                        - Sản phẩm phải còn nguyên tem mác, chưa qua sử dụng và trong tình trạng ban đầu.
                        - Các sản phẩm như đồ lót, trang sức và đồ phụ kiện không được áp dụng chính sách đổi trả.
                        - Đổi trả trong vòng 30 ngày kể từ ngày nhận sản phẩm.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        2. **Quy trình đổi trả**:
                        - Bước 1: Liên hệ với chúng tôi qua email hoặc điện thoại trong vòng 7 ngày kể từ ngày nhận hàng để thông báo yêu cầu đổi trả.
                        - Bước 2: Gửi lại sản phẩm theo địa chỉ hướng dẫn từ đội ngũ hỗ trợ khách hàng.
                        - Bước 3: Sau khi nhận được sản phẩm và kiểm tra, chúng tôi sẽ hoàn lại tiền hoặc gửi sản phẩm thay thế cho bạn, tùy thuộc vào yêu cầu của bạn.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        3. **Phí vận chuyển**:
                        - Nếu sản phẩm đổi trả do lỗi của Mulio, chúng tôi sẽ chịu phí vận chuyển.
                        - Nếu sản phẩm đổi trả không phải do lỗi của Mulio, khách hàng sẽ chịu phí vận chuyển.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        4. **Trường hợp không áp dụng chính sách đổi trả**:
                        - Sản phẩm bị hư hỏng do sử dụng không đúng cách hoặc tự ý sửa chữa.
                        - Sản phẩm đã qua sử dụng hoặc không còn trong tình trạng ban đầu.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        Mulio luôn mong muốn mang đến cho khách hàng sự hài lòng tuyệt đối với các sản phẩm của mình. Nếu bạn gặp bất kỳ vấn đề gì trong quá trình mua sắm, đừng ngần ngại liên hệ với chúng tôi. Chúng tôi sẽ cố gắng hết sức để giúp bạn có trải nghiệm mua sắm tốt nhất.
                    </p>
                    <p className="mb-4 text-center text-justify">
                        Cảm ơn bạn đã tin tưởng và lựa chọn Mulio!
                    </p>
                </div>
            </div>
        </>
    );
};

export default ReturnPolicyPage;
