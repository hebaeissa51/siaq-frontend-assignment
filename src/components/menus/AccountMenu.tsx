import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useRef, useEffect } from "react";

const AccountMenu = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-[50px] h-[50px] centered rounded-full overflow-hidden hover:bg-[#0000000a]"
            >
                <img
                    src={user?.photo}
                    className="w-[40px] h-[40px] rounded-full"
                    alt="avatar"
                />
            </button>
            {open && (
                <div className="bg-white absolute right-0 top-[45px] mt-2 min-w-[220px] rounded-[4px] overflow-visible drop-shadow-[0_2px_8px_rgba(0,0,0,0.32)] transition-[box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-50">
                    <figure className="flex items-center px-3 py-2 relative before:content-[''] before:block before:absolute before:top-0 before:right-[20px] before:w-[10px] before:h-[10px] before:bg-white before:translate-y-[-50%] before:rotate-45 before:z-0">
                        <div className="w-[48px] h-[48px] centered rounded-full overflow-hidden">
                            <img src={user?.photo} className="w-full h-full rounded-full" alt="user" />
                        </div>
                        <figcaption className="pl-2">
                            <h5 className="font-semibold text-[14px]">{user?.name}</h5>
                            <p className="text-[12px]">{user?.role}</p>
                        </figcaption>
                    </figure>
                    <hr />
                    <div className="text-[#4b5563] text-[14px] opacity-[.9]">
                        <Link
                            to={`/profile/${user?.id}`}
                            className="block hover:bg-[#f3f4f6] px-3 py-2 mt-2"
                            onClick={() => setOpen(false)}
                        >
                            <i className="far fa-user mr-2"></i>Profile
                        </Link>
                        <button
                            type="button"
                            onClick={logout}
                            className="block w-full text-start hover:bg-[#f3f4f6] px-3 py-2 mb-2"
                        >
                            <i className="fas fa-arrow-right-from-bracket mr-2"></i>Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountMenu;
