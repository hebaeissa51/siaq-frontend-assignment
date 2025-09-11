import moment from "moment";
import { FullScreenBtn } from "../components/buttons/FullScreenBtn";
import AccountMenu from "../components/menus/AccountMenu";
import { useSidebar } from "../hooks/useSidebar";
import { sidebarToggle } from "../utils/helpers";

export const Header = ({ isSidebarHovered }: { isSidebarHovered: boolean }) => {
    const { isSidebarSmall, toggleSidebar } = useSidebar();

    return (
        <header className="flex items-center justify-between px-5 bg-white h-[70px] w-full fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center w-[240px] overflow-hidden">
                <figcaption className="flex items-center">
                    <h3 className="text-[18px] text-[#131212] font-medium">Role-Based Dashboard</h3>
                </figcaption>
                <div className={`sidebar-toggle hidden md:flex ml-3 ${isSidebarSmall && !isSidebarHovered ? "positioning" : ""}`}>
                    <button type="button" className="toggle_button text-[14px]"
                        onClick={toggleSidebar}
                    >
                        <i className="fas fa-bars-staggered"></i>
                    </button>
                </div>
                <div className="sidebar-toggle ml-3 md:hidden">
                    <button type="button" className="toggle_button text-[14px]"
                        onClick={sidebarToggle}
                    >
                        <i className="fas fa-bars-staggered"></i>
                    </button>
                </div>
            </div>
            <div className="flex items-center">
                <p className="hidden sm:block mx-6">
                    <i className="far fa-clock text-[16px] text-primary mr-1"></i>
                    <span className="text-[14px] text-[#444746]">{moment().locale("en").format('h:mm A')}</span>
                </p>
                <FullScreenBtn />
                <AccountMenu />
            </div>
        </header >
    )
}