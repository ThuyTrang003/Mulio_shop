"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

import PageHeader from "@/features/layout/page-header";

import { Button } from "@/components/ui/button";

const AboutUsPage: React.FC = () => {
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
                title="Về chúng tôi"
                breadcrumbItems={[
                    { label: "Trang chủ", href: "/home" },
                    { label: "Về chúng tôi", href: "/about-us" },
                ]}
            />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="mb-4 text-4xl font-semibold">
                        Về chúng tôi
                    </h2>
                    <p className="mb-8 text-center text-justify">
                        Mulio là một thương hiệu thời trang hiện đại, chuyên
                        cung cấp các sản phẩm quần áo và phụ kiện đa dạng, dành
                        cho cả nam và nữ. Chúng tôi mang đến những bộ sưu tập
                        thời trang không chỉ thời thượng mà còn đảm bảo tính ứng
                        dụng cao, phù hợp với nhu cầu và phong cách sống của
                        từng khách hàng. Mulio không chỉ là nơi bạn tìm thấy
                        những món đồ chất lượng mà còn là một phần trong việc
                        xây dựng phong cách cá nhân, giúp bạn tự tin thể hiện
                        bản thân.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        Với mục tiêu phục vụ những tín đồ yêu thích thời trang,
                        Mulio cam kết cung cấp các sản phẩm được lựa chọn kỹ
                        càng, từ chất liệu vải đến kiểu dáng, nhằm đem lại sự
                        thoải mái tối đa cho người mặc. Chúng tôi luôn nỗ lực
                        cập nhật những xu hướng mới nhất và liên tục cải tiến
                        sản phẩm để đáp ứng nhu cầu thay đổi của thị trường và
                        người tiêu dùng.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        Chúng tôi hiểu rằng thời trang không chỉ đơn thuần là
                        những bộ quần áo, mà còn là cách bạn thể hiện cá tính và
                        phong cách sống của mình. Vì thế, Mulio luôn chú trọng
                        đến từng chi tiết, từ thiết kế cho đến chất lượng sản
                        phẩm, để mỗi món đồ của chúng tôi đều xứng đáng trở
                        thành một phần trong tủ đồ của bạn. Dù bạn là người yêu
                        thích sự thanh lịch, năng động hay phá cách, Mulio đều
                        có những lựa chọn phù hợp.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        Tại Mulio, chúng tôi cũng không chỉ tập trung vào sản
                        phẩm mà còn chú trọng đến chất lượng dịch vụ. Đội ngũ
                        nhân viên tận tình và chuyên nghiệp luôn sẵn sàng hỗ trợ
                        bạn trong suốt quá trình mua sắm, từ việc chọn lựa sản
                        phẩm cho đến việc chăm sóc khách hàng sau khi mua hàng.
                        Chúng tôi mong muốn mang đến cho bạn một trải nghiệm mua
                        sắm tuyệt vời, khiến bạn luôn cảm thấy hài lòng và quay
                        lại với Mulio.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        Với cam kết chất lượng và sự phát triển bền vững, Mulio
                        không ngừng phấn đấu để trở thành lựa chọn hàng đầu của
                        các tín đồ thời trang. Chúng tôi tin rằng mỗi sản phẩm
                        mà Mulio mang đến đều góp phần làm đẹp thêm cho cuộc
                        sống của bạn, giúp bạn trở nên tự tin hơn và tỏa sáng
                        mỗi ngày.
                    </p>
                    <p className="mb-4 text-center text-justify">
                        Cảm ơn bạn đã lựa chọn Mulio. Chúng tôi mong muốn được
                        đồng hành cùng bạn trên hành trình thể hiện phong cách
                        và cá tính riêng biệt!
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutUsPage;
