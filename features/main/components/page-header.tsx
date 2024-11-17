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
            className="flex h-[40vh] w-full flex-col justify-center bg-cover p-4 text-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <h2 className="text-5xl font-bold text-white">{title}</h2>
            <Breadcrumb>
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            <a
                                href={item.href}
                                className={`text-xl text-white ${
                                    index === breadcrumbItems.length - 1
                                        ? "font-medium"
                                        : ""
                                }`}
                            >
                                {item.label}
                            </a>
                        </BreadcrumbItem>
                        {index < breadcrumbItems.length - 1 && (
                            <span className="mx-1 py-5 text-white">&gt;</span>
                        )}
                    </React.Fragment>
                ))}
            </Breadcrumb>
        </section>
    );
};

export default PageHeader;
