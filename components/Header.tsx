import { cn } from "@/lib/utils";
import { HeaderProps } from "@/types/types";
import React from "react";

const Header = ({ title, subtitle, className }: HeaderProps) => {
    return (
        <section className={cn("mb-12 space-y-4", className?.containerStyles)}>
            <h1 className={cn("header", className?.titleStyles)}>{title} </h1>
            {subtitle && (
                <p className={cn("text-dark-700", className?.subtitleStyles)}>
                    {subtitle}
                </p>
            )}
        </section>
    );
};

export default Header;
