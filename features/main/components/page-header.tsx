import React from "react";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";

interface PageHeaderProps {
  backgroundImage: string;
  title: string;
  breadcrumbItems: Array<{ label: string; href: string }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  backgroundImage,
  title,
  breadcrumbItems,
}) => {
  return (
    <section
      className="w-full h-[40vh] bg-cover flex justify-center text-center flex-col p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h2 className="text-white font-bold text-5xl">{title}</h2>
      <Breadcrumb>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <a
                href={item.href}
                className={`text-white text-xl ${
                  index === breadcrumbItems.length - 1 ? "font-bold" : ""
                }`}
              >
                {item.label}
              </a>
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && (
              <span className="mx-1 text-white py-5">&gt;</span>
            )}
          </React.Fragment>
        ))}
      </Breadcrumb>
    </section>
  );
};

export default PageHeader;
