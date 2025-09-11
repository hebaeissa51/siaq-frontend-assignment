import { useState } from "react";
import { Header } from "./Header";
import Sidebar from "./Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);

    return (
        <>
            <Header isSidebarHovered={isSidebarHovered} />
            <Sidebar onHoverChange={setIsSidebarHovered} />
            {children}
        </>
    );
};
