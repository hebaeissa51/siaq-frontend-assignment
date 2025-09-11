import { NavLink } from "react-router-dom";
import React, { useRef, useState } from "react";
import { closeSidebar, useSidebarHandler } from "../utils/helpers";
import { useSidebar } from "../hooks/useSidebar";
import { useAuth } from "../hooks/useAuth";

type SidebarProps = {
    onHoverChange: React.Dispatch<React.SetStateAction<boolean>>;
};

function Sidebar({ onHoverChange }: SidebarProps) {
    const { logout } = useAuth();
    const { isSidebarSmall, isLargeScreen } = useSidebar();
    const [isHovered, setIsHovered] = useState(false);
    const sidenavRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useSidebarHandler(sidenavRef, overlayRef);

    const handleMouseEnter = () => {
        if (!isLargeScreen) return;
        if (isSidebarSmall && !isHovered) {
            setIsHovered(true);
            if (onHoverChange) onHoverChange(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isLargeScreen) return;
        if (isSidebarSmall && isHovered) {
            setIsHovered(false);
            if (onHoverChange) onHoverChange(false);
        }
    };

    const handleCloseSidebar = () => {
        closeSidebar(sidenavRef, overlayRef);
    };

    const sidebarClass = isLargeScreen && isSidebarSmall && !isHovered ? 'sm' : '';

    return (
        <>
            <div
                id="background_overlay"
                ref={overlayRef}
                className="fixed top-0 left-0 right-0 bottom-0 z-[999] h-full bg-[rgba(0,0,0,0.61)] overflow-hidden hidden"
            ></div>
            <nav
                id="sideNav"
                ref={sidenavRef}
                className={`block bg-white h-full fixed box-content overflow-y-scroll scrollbar-hidden w-[240px] top-[65px] left-0 max-[800px]:left-[-400px] max-[800px]:top-0 bottom-0 z-[1000] p-0 pb-[50px] transition-all duration-500 ${sidebarClass}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="hidden max-[800px]:flex justify-between items-center p-3">
                    <figcaption className="logo">
                        <h3 className="font-medium">Main menu</h3>
                    </figcaption>
                    <button className="border-0 p-1 text-[14px]" id="close" onClick={handleCloseSidebar}>
                        <i className="fas fa-xmark"></i>
                    </button>
                </div>
                <div className="flex flex-col justify-between min-h-[85%]">
                    <ul className="mt-3">
                        <hr className="hidden max-[800px]:block" />
                        <li className="relative py-[10px] px-[15px]">
                            <NavLink
                                to="/"
                                onClick={handleCloseSidebar}
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link text-primary border-l-[6px] border-primary bg-emerald-50"
                                        : "nav-link border-l-[6px] border-transparent hover:border-primary hover:text-primary transition-3s"
                                }>
                                <i className="fas fa-gauge-high"></i>
                                <span className="pl-3">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="relative py-[10px] px-[15px]">
                            <NavLink
                                to="/users"
                                onClick={handleCloseSidebar}
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link text-primary border-l-[6px] border-primary bg-emerald-50"
                                        : "nav-link border-l-[6px] border-transparent hover:border-primary hover:text-primary transition-3s"
                                }>
                                <i className="fas fa-users-gear"></i>
                                <span className="pl-3">Users Management</span>
                            </NavLink>
                        </li>
                        <li className="relative py-[10px] px-[15px]">
                            <NavLink
                                to="/clients"
                                onClick={handleCloseSidebar}
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link text-primary border-l-[6px] border-primary bg-emerald-50"
                                        : "nav-link border-l-[6px] border-transparent hover:border-primary hover:text-primary transition-3s"
                                }>
                                <i className="fas fa-people-group"></i>
                                <span className="pl-3">Clients</span>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="block w-full">
                        <hr className="w-full" />
                        <li className="py-[5px] px-[15px] mt-5">
                            <button
                                type="button"
                                className="nav-link px-[15px] inline-block w-auto text-start border border-primary text-primary hover:bg-emerald-50 transition-3s"
                                onClick={logout}
                            >
                                <i className="fas fa-arrow-right-from-bracket"></i>
                                <span className="pl-3">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default React.memo(Sidebar);