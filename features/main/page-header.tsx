// page-header.tsx
import React from "react";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb"; // Nhập Breadcrumb từ shacdn-ui

interface PageHeaderProps {
  backgroundImage: string;
  title: string;
  breadcrumbItems: Array<{ label: string; href: string }>; // Thay đổi kiểu dữ liệu cho breadcrumb
}

const PageHeader: React.FC<PageHeaderProps> = ({
  backgroundImage,
  title,
  breadcrumbItems,
}) => {
  const headerStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    width: "100%",
    height: "40vh", // bạn có thể điều chỉnh chiều cao nếu cần
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
    padding: "14px",
  };

  const textStyle: React.CSSProperties = {
    color: "#FFF",
    fontWeight: 700,
    fontSize: "36px",
  };

  return (
    <section style={headerStyle}>
      <h2 style={textStyle}>{title}</h2>
      <Breadcrumb>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <a
                href={item.href}
                style={{ color: "#FFF", fontSize: "20px", fontWeight: 700 }}
              >
                {item.label}
              </a>
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && ( // Kiểm tra để không thêm dấu ">" ở cuối
              <span style={{ margin: "0 5px", color: "#FFF" }}> &gt; </span>
            )}
          </React.Fragment>
        ))}
      </Breadcrumb>
    </section>
  );
};

export default PageHeader;
