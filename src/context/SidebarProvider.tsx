import { useState, useEffect } from 'react';
import { SidebarContext } from './SidebarContext';

const SidebarProvider = ({ children }: {children: React.ReactNode}) => {
    const [isSidebarSmall, setIsSidebarSmall] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 800);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth > 800);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isLargeScreen) {
            const storedSidebarState = sessionStorage.getItem('sidebarState');
            if (storedSidebarState) {
                setIsSidebarSmall(JSON.parse(storedSidebarState));
            }
        }
    }, [isLargeScreen]);

    const toggleSidebar = () => {
        if (isLargeScreen) {
            setIsSidebarSmall((prevState) => {
                const newState = !prevState;
                sessionStorage.setItem('sidebarState', JSON.stringify(newState));
                return newState;
            });
        }
    };

    return (
        <SidebarContext.Provider value={{ isSidebarSmall, toggleSidebar, isLargeScreen }}>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
